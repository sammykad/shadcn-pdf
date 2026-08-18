import { View, Text } from "@react-pdf/renderer";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card";
import { Badge } from "../components/badge";

export default function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
        <CardAction>
          <Badge variant="outline">Action</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Text
          style={{ fontSize: 11, lineHeight: 1.5, color: "#0a0a0a" }}
        >
          Card content goes here. This is the main body of the card and can
          hold any PDF content — text, tables, badges, or nested layouts.
        </Text>
      </CardContent>
      <CardFooter>
        <Text style={{ fontSize: 9, color: "#737373" }}>
          Card footer
        </Text>
      </CardFooter>
    </Card>
  );
}