import { Stack } from "../components/layout";
import { Badge } from "../components/badge";

export default function BadgeDemo() {
  return (
    <Stack gap={2}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </Stack>
  );
}