import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper";

export function CodeExample({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <CodeCollapsibleWrapper className={className}>
      {children}
    </CodeCollapsibleWrapper>
  );
}
