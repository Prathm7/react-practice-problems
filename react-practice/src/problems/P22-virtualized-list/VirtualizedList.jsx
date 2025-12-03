import React, { useCallback, useEffect, useRef, useState } from "react";

export default function VirtualizedList({
  items = [],
  height = 400,
  itemHeight = 30,
  renderItem,
  overscan = 5,
}) {
  const total = items.length;
  const totalHeight = total * itemHeight;
  const containerRef = useRef(null);

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    Math.ceil(height / itemHeight)
  );

  const rafRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const measured = Math.ceil(
        containerRef.current.clientHeight / itemHeight
      );
      setVisibleCount(measured);
    } else {
      setVisibleCount(Math.ceil(height / itemHeight));
    }
  }, [height, itemHeight]);

  const onScroll = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const scroller = containerRef.current;
      if (!scroller) return;
      const scrollTop = scroller.scrollTop;
      const newStart = Math.floor(scrollTop / itemHeight) - overscan;
      setStartIndex(Math.max(0, newStart));
    });
  }, [itemHeight, overscan]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  const endIndex = Math.min(total, startIndex + visibleCount + overscan * 2);
  const visibleItems = items.slice(startIndex, endIndex);

  const topSpacerHeight = startIndex * itemHeight;
  const bottomSpacerHeight = Math.max(
    0,
    totalHeight - topSpacerHeight - visibleItems.length * itemHeight
  );

  return (
    <div
      ref={containerRef}
      style={{
        height,
        overflowY: "auto",
        border: "1px solid #e6e6e6",
        borderRadius: 6,
        position: "relative",
      }}
      tabIndex={0}
      role="list"
      aria-label="Virtualized list"
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {topSpacerHeight > 0 && (
          <div style={{ height: topSpacerHeight }} aria-hidden />
        )}

        <div style={{ position: "relative" }}>
          {visibleItems.map((item, idx) => {
            const realIndex = startIndex + idx;
            return (
              <div
                key={item.id ?? realIndex}
                style={{
                  height: itemHeight,
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  borderBottom: "1px solid #f2f2f2",
                }}
                role="listitem"
                aria-posinset={realIndex + 1}
                aria-setsize={total}
              >
                {renderItem ? renderItem(item, realIndex) : String(item)}
              </div>
            );
          })}
        </div>

        {bottomSpacerHeight > 0 && (
          <div style={{ height: bottomSpacerHeight }} aria-hidden />
        )}
      </div>
    </div>
  );
}
