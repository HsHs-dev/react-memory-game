export default function FeedbackFlash({ kind }) {
  if (!kind) return null;
  return (
    <div
      aria-hidden="true"
      className={`feedback-flash is-${kind}`}
    />
  );
}