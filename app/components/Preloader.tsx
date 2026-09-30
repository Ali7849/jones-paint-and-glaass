export default function Preloader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <img
        src="/assets/images/logo.png"
        alt=""
        width={96}
        height={96}
        className="w-20 h-20 md:w-24 md:h-24 animate-[spin_1.5s_linear_infinite] motion-reduce:animate-pulse"
      />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
