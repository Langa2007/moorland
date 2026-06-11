import MotionReveal from "@/components/MotionReveal";

export default function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <MotionReveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="heading-lg mt-3 text-charcoal">{title}</h2>
      {text && <p className="mt-5 text-lg leading-8 text-mist">{text}</p>}
    </MotionReveal>
  );
}
