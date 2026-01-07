"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { greetings, type Greeting } from "@/lib/greetings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

export default function Home() {
  const [selectedGreeting, setSelectedGreeting] = useState<Greeting>(greetings[0]);

  const handleLanguageChange = (value: string) => {
    const newGreeting = greetings.find((g) => g.language === value) || greetings[0];
    setSelectedGreeting(newGreeting);
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="items-center text-center">
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Global Greeter
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-4 text-center">
          <p className="text-muted-foreground">
            Select a language to see 'Hello World' translated.
          </p>

          <Select onValueChange={handleLanguageChange} defaultValue={selectedGreeting.language}>
            <SelectTrigger className="w-full text-lg">
              <SelectValue placeholder="Choose a language..." />
            </SelectTrigger>
            <SelectContent>
              {greetings.map((item) => (
                <SelectItem key={item.language} value={item.language} className="text-lg">
                  {item.language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex min-h-[100px] items-center justify-center rounded-lg bg-accent/20 p-6">
            <h2
              key={selectedGreeting.language}
              className="animate-fade-in font-headline text-4xl font-extrabold tracking-wider text-primary sm:text-5xl"
              style={{ textShadow: "1px 1px 3px hsl(var(--primary) / 0.2)" }}
            >
              {selectedGreeting.greeting}
            </h2>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
