
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Search,
  Stethoscope,
  MapPin,
  CalendarDays,
  Video,
  X,
  UserRound,
} from "lucide-react";
import "./ExploreDoctors.css";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  fee: number;
  city: string;
  image: string;
  consultationType: "Online" | "In-person" | "Both";
  availableToday: boolean;
  about?: string;
};

const demoDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Cardiology",
    qualification: "MBBS, MD, DM Cardiology",
    experience: 12,
    fee: 800,
    city: "Bhubaneswar",
    image: "https://i.pravatar.cc/300?img=47",
    consultationType: "Both",
    availableToday: true,
    about: "Preventive care and cardiovascular health consultations.",
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialty: "Diabetes",
    qualification: "MBBS, MD General Medicine",
    experience: 9,
    fee: 600,
    city: "Bhubaneswar",
    image: "https://i.pravatar.cc/300?img=12",
    consultationType: "Online",
    availableToday: true,
    about: "Diabetes management and metabolic health consultations.",
  },
  {
    id: 3,
    name: "Dr. Priya Nair",
    specialty: "Dermatology",
    qualification: "MBBS, MD Dermatology",
    experience: 8,
    fee: 500,
    city: "Cuttack",
    image: "https://i.pravatar.cc/300?img=44",
    consultationType: "Both",
    availableToday: false,
    about: "Consultations for skin, hair and nail concerns.",
  },
  {
    id: 4,
    name: "Dr. Arjun Das",
    specialty: "General Medicine",
    qualification: "MBBS, MD General Medicine",
    experience: 10,
    fee: 400,
    city: "Bhubaneswar",
    image: "https://i.pravatar.cc/300?img=13",
    consultationType: "In-person",
    availableToday: true,
    about: "General health consultations and preventive care.",
  },
  {
    id: 5,
    name: "Dr. Sneha Patel",
    specialty: "Endocrinology",
    qualification: "MBBS, MD, DM Endocrinology",
    experience: 11,
    fee: 700,
    city: "Puri",
    image: "https://i.pravatar.cc/300?img=49",
    consultationType: "Online",
    availableToday: false,
    about: "Consultations for hormonal and endocrine health.",
  },
  {
    id: 6,
    name: "Dr. Vikram Singh",
    specialty: "Cardiology",
    qualification: "MBBS, MD, DM Cardiology",
    experience: 15,
    fee: 900,
    city: "Cuttack",
    image: "https://i.pravatar.cc/300?img=68",
    consultationType: "Both",
    availableToday: true,
    about: "Cardiovascular assessments and heart health consultations.",
  },
];

const specialties = [
  "All Specialties",
  "Cardiology",
  "Diabetes",
  "Dermatology",
  "Endocrinology",
  "General Medicine",
];

const API = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

type Props = {
  onBackHome?: () => void;
};

export default function ExploreDoctors({ onBackHome }: Props) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [consultation, setConsultation] = useState("All");
  const [sort, setSort] = useState("recommended");

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("Online");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDoctors() {
      try {
        const response = await fetch(`${API}/doctors`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Doctors API unavailable");

        const result = await response.json();
        const list = Array.isArray(result) ? result : result.doctors;

        if (!Array.isArray(list)) throw new Error("Invalid response");

        setDoctors(list);
        setDemoMode(false);
      } catch {
        if (!controller.signal.aborted) {
          setDoctors(demoDoctors);
          setDemoMode(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadDoctors();
    return () => controller.abort();
  }, []);

  const visibleDoctors = useMemo(() => {
    let result = doctors.filter((doctor) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        doctor.name?.toLowerCase().includes(q) ||
        doctor.specialty?.toLowerCase().includes(q) ||
        doctor.qualification?.toLowerCase().includes(q) ||
        doctor.city?.toLowerCase().includes(q);

      const matchesSpecialty =
        specialty === "All Specialties" ||
        doctor.specialty === specialty;

      const matchesConsultation =
        consultation === "All" ||
        doctor.consultationType === "Both" ||
        doctor.consultationType === consultation;

      return matchesSearch && matchesSpecialty && matchesConsultation;
    });

    if (sort === "fee-low") {
      result = [...result].sort((a, b) => a.fee - b.fee);
    }

    if (sort === "experience") {
      result = [...result].sort(
        (a, b) => b.experience - a.experience
      );
    }

    return result;
  }, [doctors, search, specialty, consultation, sort]);

  function openBooking(doctor: Doctor) {
    setSelectedDoctor(doctor);
    setMode(doctor.consultationType === "In-person" ? "In-person" : "Online");
    setMessage("");
    setBookingSuccess(false);
  }

  async function submitAppointment(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    if (!selectedDoctor) return;

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${API}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          patientName: patientName.trim(),
          phone: phone.trim(),
          appointmentDate: date,
          appointmentTime: time,
          consultationType: mode,
          reason: reason.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your request.");
      }

      setBookingSuccess(true);
      setMessage(
        result.message ||
          "Your request has been submitted. The clinic must confirm your appointment."
      );
    } catch (error) {
      setMessage(
        demoMode
          ? "Demo mode: the request was not saved. Connect the appointments API to enable booking."
          : error instanceof Error
            ? error.message
            : "Unable to submit your request."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
     <Navbar />
    <main className="explore-doctors">
      <section className="ed-hero">
        <div className="ed-hero-copy">
          <span className="ed-eyebrow">
            <Stethoscope size={15} /> YOUR WELLBEING MATTERS
          </span>
          <h1>
            Find the right doctor
            <span> for your health.</span>
          </h1>
          <p>
            Discover healthcare professionals, explore specialties and
            request a consultation that suits your needs.
          </p>

          <form
            className="ed-search"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("ed-directory")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <Search size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Doctor name, specialty or city"
              aria-label="Search doctors"
            />
            <button type="submit">Search</button>
          </form>

          <div className="ed-hero-points">
            <span><UserRound size={16} /> Multiple specialties</span>
            <span><CalendarDays size={16} /> Appointment requests</span>
          </div>
        </div>

        <div className="ed-hero-image">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85"
            alt="Healthcare professional"
          />
          <div className="ed-floating-card">
            <span className="ed-check">✓</span>
            <div>
              <strong>Your health comes first</strong>
              <small>Find care that fits your needs</small>
            </div>
          </div>
        </div>
      </section>

      {demoMode && (
        <div className="ed-demo-notice">
          Showing sample doctor profiles. Connect your database to display
          verified doctors.
        </div>
      )}

      <section className="ed-specialties">
        <div className="ed-section-heading">
          <div>
            <span className="ed-eyebrow">FIND YOUR SPECIALIST</span>
            <h2>Browse by specialty</h2>
            <p>Choose a specialty to narrow down your search.</p>
          </div>
        </div>

        <div className="ed-specialty-grid">
          {[
            { name: "Cardiology", icon: "♥" },
            { name: "Diabetes", icon: "✚" },
            { name: "Dermatology", icon: "✧" },
            { name: "Endocrinology", icon: "◈" },
            { name: "General Medicine", icon: "+" },
          ].map((item) => (
            <button
              type="button"
              key={item.name}
              className={`ed-specialty ${
                specialty === item.name ? "selected" : ""
              }`}
              onClick={() =>
                setSpecialty(
                  specialty === item.name ? "All Specialties" : item.name
                )
              }
            >
              <span>{item.icon}</span>
              <strong>{item.name}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="ed-directory" id="ed-directory">
        <div className="ed-section-heading ed-directory-heading">
          <div>
            <span className="ed-eyebrow">IHEALTHY BIO DIRECTORY</span>
            <h2>Explore doctors</h2>
            <p>Find a healthcare professional for your needs.</p>
          </div>
          <span className="ed-count">
            {loading ? "Loading..." : `${visibleDoctors.length} doctors found`}
          </span>
        </div>

        <div className="ed-filters">
          <label>
            Specialty
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              {specialties.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Consultation
            <select
              value={consultation}
              onChange={(e) => setConsultation(e.target.value)}
            >
              <option value="All">All types</option>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
            </select>
          </label>

          <label>
            Sort doctors
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="fee-low">Fee: low to high</option>
              <option value="experience">Most experienced</option>
            </select>
          </label>

          <button
            className="ed-reset"
            onClick={() => {
              setSearch("");
              setSpecialty("All Specialties");
              setConsultation("All");
              setSort("recommended");
            }}
          >
            Reset filters
          </button>
        </div>

        {loading ? (
          <div className="ed-empty">Loading doctor directory...</div>
        ) : visibleDoctors.length === 0 ? (
          <div className="ed-empty">
            <Search size={35} />
            <h3>No doctors found</h3>
            <p>Try a different name, specialty or consultation type.</p>
            <button
              className="ed-primary-button"
              onClick={() => {
                setSearch("");
                setSpecialty("All Specialties");
                setConsultation("All");
              }}
            >
              View all doctors
            </button>
          </div>
        ) : (
          <div className="ed-doctor-grid">
            {visibleDoctors.map((doctor) => (
              <article className="ed-doctor-card" key={doctor.id}>
                <div className="ed-card-image">
                  <img
                    src={doctor.image || "https://i.pravatar.cc/300"}
                    alt={doctor.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://i.pravatar.cc/300";
                    }}
                  />
                  <span
                    className={`ed-status ${
                      doctor.availableToday ? "open" : "check"
                    }`}
                  >
                    {doctor.availableToday ? "Available today" : "Check slots"}
                  </span>
                </div>

                <div className="ed-card-body">
                  <span className="ed-doctor-specialty">{doctor.specialty}</span>
                  <h3>{doctor.name}</h3>
                  <p className="ed-qualification">{doctor.qualification}</p>

                  <div className="ed-meta">
                    <span><Stethoscope size={15} /> {doctor.experience} years</span>
                    <span><MapPin size={15} /> {doctor.city}</span>
                  </div>

                  <div className="ed-consult-type">
                    {doctor.consultationType === "Both" ? (
                      <><Video size={16} /> Online & in-person</>
                    ) : doctor.consultationType === "Online" ? (
                      <><Video size={16} /> Online consultation</>
                    ) : (
                      <><MapPin size={16} /> In-person consultation</>
                    )}
                  </div>

                  <div className="ed-card-footer">
                    <div>
                      <small>Consultation fee</small>
                      <strong>₹{Number(doctor.fee).toLocaleString("en-IN")}</strong>
                    </div>
                    <button onClick={() => openBooking(doctor)}>
                      Book appointment
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {selectedDoctor && (
        <div
          className="ed-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !submitting) {
              setSelectedDoctor(null);
            }
          }}
        >
          <section
            className="ed-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ed-booking-title"
          >
            <div className="ed-modal-heading">
              <div>
                <span className="ed-eyebrow">APPOINTMENT REQUEST</span>
                <h2 id="ed-booking-title">Book a consultation</h2>
              </div>
              <button
                type="button"
                className="ed-close"
                aria-label="Close"
                onClick={() => setSelectedDoctor(null)}
                disabled={submitting}
              >
                <X />
              </button>
            </div>

            <div className="ed-selected-doctor">
              <img src={selectedDoctor.image} alt="" />
              <div>
                <strong>{selectedDoctor.name}</strong>
                <span>{selectedDoctor.specialty}</span>
                <b>₹{Number(selectedDoctor.fee).toLocaleString("en-IN")}</b>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="ed-booking-success" role="status">
                <CalendarDays size={36} />
                <h3>Request submitted</h3>
                <p>{message}</p>
                <button
                  className="ed-primary-button"
                  onClick={() => setSelectedDoctor(null)}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="ed-booking-form" onSubmit={submitAppointment}>
                <label>
                  Full name
                  <input
                    required
                    maxLength={150}
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </label>

                <label>
                  Phone number
                  <input
                    required
                    type="tel"
                    pattern="[+]?[0-9 ()-]{10,18}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </label>

                <div className="ed-form-row">
                  <label>
                    Appointment date
                    <input
                      required
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>

                  <label>
                    Time slot
                    <select
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="">Select time</option>
                      {[
                        ["09:00", "09:00 AM"],
                        ["10:00", "10:00 AM"],
                        ["11:00", "11:00 AM"],
                        ["14:00", "02:00 PM"],
                        ["15:00", "03:00 PM"],
                        ["16:00", "04:00 PM"],
                        ["17:00", "05:00 PM"],
                      ].map(([value, label]) => (
                        <option value={value} key={value}>{label}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  Consultation type
                  <select
                    required
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    {selectedDoctor.consultationType !== "In-person" && (
                      <option value="Online">Online</option>
                    )}
                    {selectedDoctor.consultationType !== "Online" && (
                      <option value="In-person">In-person</option>
                    )}
                  </select>
                </label>

                <label>
                  Reason for visit (optional)
                  <textarea
                    rows={3}
                    maxLength={1000}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly describe your reason for consultation"
                  />
                </label>

                {message && <p className="ed-error" role="alert">{message}</p>}

                <button
                  className="ed-primary-button ed-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit appointment request"}
                </button>

                <p className="ed-disclaimer">
                  Your request is not a confirmed appointment until the clinic
                  verifies the slot and confirms your booking.
                </p>
              </form>
            )}
          </section>
        </div>
      )}

      {onBackHome && (
        <div className="ed-back-home">
          <button onClick={onBackHome}>← Back to home</button>
        </div>
      )}
    </main>
     <Footer />
     </>
  );
}
