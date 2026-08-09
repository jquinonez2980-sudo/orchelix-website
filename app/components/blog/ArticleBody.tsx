import type { Block } from "@/app/i18n/posts";

/* Renders inline markup inside a block's text:
   - [label](/href) → anchor (internal-link friendly)
   - **bold**       → <strong> */
function renderInline(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      nodes.push(
        <a
          key={key++}
          href={m[2]}
          style={{ color: "var(--teal-700)", textDecoration: "underline", textUnderlineOffset: "2px" }}
        >
          {m[1]}
        </a>,
      );
    } else if (m[3]) {
      nodes.push(<strong key={key++}>{m[3]}</strong>);
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function ArticleBody({ body }: { body: Block[] }) {
  return (
    <div className="flex flex-col" style={{ fontFamily: "var(--font-display)" }}>
      {body.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 mb-3 text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] sm:text-[28px]"
                style={{ color: "var(--ink)" }}
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-7 mb-2 text-[19px] font-semibold leading-snug"
                style={{ color: "var(--ink)" }}
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className="mb-5 text-[17px] leading-[1.7]"
                style={{ color: "var(--ink-2)" }}
              >
                {renderInline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mb-6 flex flex-col gap-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[16.5px] leading-[1.6]" style={{ color: "var(--ink-2)" }}>
                    <span aria-hidden="true" className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--teal-500)" }} />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <p
                key={i}
                className="my-6 rounded-[14px] border-l-2 py-4 pl-5 pr-5 text-[16.5px] leading-[1.6]"
                style={{
                  borderColor: "var(--teal-500)",
                  background: "var(--teal-50)",
                  color: "var(--navy-700)",
                }}
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
