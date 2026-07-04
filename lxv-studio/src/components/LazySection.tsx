import React, { useRef, useState, useEffect, Suspense, type ReactNode } from "react";

const Placeholder = () => <div className="min-h-[40vh]" aria-hidden="true" />;

export function LazySection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? <Suspense fallback={<Placeholder />}>{children}</Suspense> : <Placeholder />}
    </div>
  );
}
