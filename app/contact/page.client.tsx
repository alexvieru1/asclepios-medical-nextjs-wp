"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactFormSchema,
  type ContactFormInput,
} from "@/lib/validators/contact-form";
import { cn } from "@/lib/utils";
import { format, isValid, isWeekend, parseISO, startOfToday } from "date-fns";
import { ro } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import ContactAssist from "@/components/contact-assist";

function toastAppointmentSuccess(
  values: ContactFormInput,
  specialties: { slug: string; name: string }[]
) {
  const label =
    specialties.find(
      (s) => s.slug === values.specialty || s.name === values.specialty
    )?.name ?? values.specialty;

  const dateHuman =
    values.preferredDate && isValid(parseISO(values.preferredDate))
      ? format(parseISO(values.preferredDate), "PPP", { locale: ro })
      : null;

  toast.success("Solicitarea a fost trimisă ✅", {
    description: [
      `Mulțumim, ${values.name}.`,
      label ? `Specialitate: ${label}.` : null,
      dateHuman ? `Data preferată: ${dateHuman}.` : null,
    ]
      .filter(Boolean)
      .join(" "),
    duration: 7000,
    action: {
      label: "Închide",
      onClick: () => {},
    },
  });
}

type UiSpecialty = { slug: string; name: string };
type UiDoctor = {
  slug: string;
  name: string;
  specialties: string[];
};

type Props = {
  specialties: UiSpecialty[];
  doctors: UiDoctor[];
  defaultSpecialty?: string;
};

export default function ContactClient({
  specialties,
  doctors,
  defaultSpecialty = "",
}: Props) {
  const NO_SPECIALTY = "__none__";
  const ANY_DOCTOR = "__any__";

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialty: defaultSpecialty ?? "",
      doctor: "",
      preferredDate: "",
      message: "",
      website: "",
      consent: false,
    },
  });

  const { isSubmitting } = form.formState;
  const selectedSpecialty = form.watch("specialty");

  const filteredDoctors = React.useMemo(() => {
    if (!selectedSpecialty) return doctors;
    return doctors.filter((doctor) =>
      doctor.specialties.includes(selectedSpecialty)
    );
  }, [doctors, selectedSpecialty]);

  React.useEffect(() => {
    const currentDoctor = form.getValues("doctor");
    if (!currentDoctor) return;
    if (!filteredDoctors.some((doctor) => doctor.slug === currentDoctor)) {
      form.setValue("doctor", "");
    }
  }, [filteredDoctors, form]);

  const onSubmit = async (values: ContactFormInput) => {
    const cf7Speciality =
      specialties.find((s) => s.slug === values.specialty)?.name ||
      values.specialty ||
      "";

    const doctorName =
      doctors.find((d) => d.slug === values.doctor)?.name ||
      values.doctor ||
      "";

    // guard: CF7 requires speciality
    if (!cf7Speciality) {
      form.setError("specialty", { message: "Alegeți o specialitate validă." });
      return;
    }

    // build payload for API (clear honeypot explicitly)
    const payload: ContactFormInput = {
      ...values,
      specialty: cf7Speciality,
      doctor: doctorName,
      website: "", // honeypot must be blank
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.invalidFields) {
          console.warn("CF7 invalidFields:", data.invalidFields);
        }
        throw new Error(data.error ?? "Nu am putut trimite solicitarea.");
      }

      // pretty success toast (shows human label + date nicely)
      toastAppointmentSuccess(
        { ...values, specialty: cf7Speciality }, // so helper can show the label
        specialties
      );

      // reset (keep selected specialty in the UI)
      form.reset({
        name: "",
        email: "",
        phone: "",
        specialty: values.specialty,
        doctor: "",
        preferredDate: "",
        message: "",
        website: "",
        consent: false,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Nu am putut trimite solicitarea. Încercați din nou mai târziu."
      );
    }
  };

  return (
    <section className="bg-gradient-to-t from-emerald-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-10 text-center">
          <h1 className="text-emerald-900 text-2xl font-bold md:text-3xl">
            Solicită o programare
          </h1>
          <p className="mt-3 text-emerald-900/70">
            Completați formularul, iar echipa noastră vă va contacta pentru
            confirmare.
          </p>
        </header>

        <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/40 backdrop-blur sm:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-emerald-900">
                        Nume complet*
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30"
                          placeholder="Numele dumneavoastră"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-emerald-900">Email*</FormLabel>
                      <FormControl>
                        <Input
                          className="border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30"
                          type="email"
                          placeholder="exemplu@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-emerald-900">
                        Telefon*
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30"
                          placeholder="0722 000 000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-emerald-900">
                        Data preferată
                      </FormLabel>
                      <PreferredDatePicker
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-emerald-900">
                        Specialitate*
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === NO_SPECIALTY ? "" : value)
                        }
                        value={
                          field.value && field.value.length
                            ? field.value
                            : NO_SPECIALTY
                        }
                      >
                        <FormControl>
                          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500/30 focus:border-emerald-500">
                            <SelectValue placeholder="Alegeți specialitatea" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-emerald-200 bg-white/95 backdrop-blur">
                          <SelectItem value={NO_SPECIALTY}>
                            Nespecificat
                          </SelectItem>
                          {specialties.map((specialty) => (
                            <SelectItem
                              key={specialty.slug}
                              value={specialty.slug}
                            >
                              {specialty.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-emerald-800/70">
                        Alegeți specialitatea dorită pentru a filtra medicii
                        disponibili.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-emerald-900">
                        Medic preferat
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === ANY_DOCTOR ? "" : value)
                        }
                        value={
                          field.value && field.value.length
                            ? field.value
                            : ANY_DOCTOR
                        }
                        disabled={filteredDoctors.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500/30 focus:border-emerald-500">
                            <SelectValue
                              placeholder={
                                filteredDoctors.length
                                  ? "Alegeți medicul"
                                  : "Niciun medic disponibil"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-emerald-200 bg-white/95 backdrop-blur">
                          <SelectItem value={ANY_DOCTOR}>
                            Orice medic disponibil
                          </SelectItem>
                          {filteredDoctors.map((doctor) => (
                            <SelectItem key={doctor.slug} value={doctor.slug}>
                              {doctor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-emerald-900">Mesaj*</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border-emerald-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30"
                        rows={5}
                        placeholder="Descrieți pe scurt motivul solicitării"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox
                          className="border-emerald-400 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white"
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 text-sm">
                        <FormLabel className="font-medium text-emerald-900">
                          Sunt de acord cu prelucrarea datelor mele cu caracter
                          personal.
                        </FormLabel>
                        <p className="text-emerald-800/70">
                          Datele sunt utilizate exclusiv pentru a vă contacta în
                          legătură cu solicitarea.
                        </p>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Honeypot */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input tabIndex={-1} autoComplete="off" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full md:w-auto !bg-emerald-600 text-white shadow-emerald-500/40 hover:!bg-emerald-700 focus-visible:ring-emerald-500/40"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Se trimite…" : "Trimite solicitarea"}
              </Button>
            </form>
          </Form>
        </div>

        <ContactAssist
          address="Str. Prelungirea Bucovinei nr. 8B, Apartament 1, 900615 Constanța"
          phone="0241 611 445"
        />
      </div>
    </section>
  );
}

const PreferredDatePicker = React.forwardRef<
  HTMLButtonElement,
  { value?: string; onChange: (value: string) => void; onBlur: () => void }
>(({ value, onChange, onBlur }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const selectedDate = React.useMemo(() => parsePreferredDate(value), [value]);
  const today = React.useMemo(() => startOfToday(), []);

  React.useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!containerRef.current || containerRef.current.contains(target)) {
        return;
      }
      setIsOpen(false);
      onBlur();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        onBlur();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onBlur]);

  const toggleOpen = () => {
    setIsOpen((previous) => {
      const next = !previous;
      if (previous && !next) onBlur();
      return next;
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <FormControl>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal !border-emerald-200 text-emerald-900 shadow-none transition-colors hover:bg-emerald-50 focus-visible:!border-emerald-500 focus-visible:ring-emerald-500/30",
            !selectedDate && "text-emerald-800"
          )}
          ref={ref}
          onClick={toggleOpen}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-emerald-800" />
          {selectedDate
            ? format(selectedDate, "PPP", { locale: ro })
            : "Selectați data"}
        </Button>
      </FormControl>
      {isOpen ? (
        <div className="absolute left-0 top-full z-10 mt-2 rounded-xl border border-emerald-200 bg-white/95 p-3 shadow-lg shadow-emerald-100/60">
          <Calendar
            className="rounded-lg border border-emerald-100 bg-emerald-50/60"
            mode="single"
            initialFocus
            defaultMonth={selectedDate ?? today}
            selected={selectedDate}
            onSelect={(date) => {
              onChange(date ? format(date, "yyyy-MM-dd") : "");
              setIsOpen(false);
              onBlur();
            }}
            disabled={(date) => date < today || isWeekend(date)}
          />
        </div>
      ) : null}
    </div>
  );
});

PreferredDatePicker.displayName = "PreferredDatePicker";

function parsePreferredDate(value?: string) {
  if (!value) return undefined;
  try {
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}
