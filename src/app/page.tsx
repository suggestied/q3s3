import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>Card 1</CardHeader>
          <CardContent>
            <p>Content 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Card 2</CardHeader>
          <CardContent>
            <p>Content 2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Card 3</CardHeader>
          <CardContent>
            <p>Content 3</p>
          </CardContent>
        </Card>
        </div>
    </div>
  );
}
