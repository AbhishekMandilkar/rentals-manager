import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  ArrowRight, PlayCircle,
  WalletIcon
} from "lucide-react";
import Link from "next/link";
import {motion} from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import FeatureCards from "./features";
import {SignInButton} from "@clerk/nextjs";
import HowItWorksSection from "./working";

export default function LandingPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen font-geist py-2">
      <header className="px-6 lg:px-10 h-14 flex items-center">
        <Link className="flex items-center justify-center space-x-2" href="#">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <WalletIcon className="size-8 bg-primary text-white p-1 rounded-md" />
          </div>
          <span className="text-lg truncate font-geist">Lend Rents</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 font-geist">
          <Link
            className="text-sm hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm hover:underline underline-offset-4"
            href="#testimonials"
          >
            Testimonials
          </Link>
          <Link
            className="text-sm hover:underline underline-offset-4"
            href="#faq"
          >
            FAQ
          </Link>
        </nav>
        <Button asChild className="ml-4">
          <SignInButton>Get Started Free</SignInButton>
        </Button>
      </header>
      <main className="flex-1 px-6 lg:px-10 space-y-4">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
        >
          <div className="container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplify Lending & Rental Income Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 font-geist-mono">
                  Track loans, manage rentals, and stay on top of your
                  income—all from one intuitive app.
                </p>
              </div>
              <div className="space-x-4 flex items-end">
                <Button asChild>
                  <SignInButton>Get Started Free</SignInButton>
                </Button>
                <Button variant="outline">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 rounded-lg"
        >
          <div className="container">
            <h1 className="text-3xl font-bold text-center mb-8">
              Designed to streamline rental and lending management for growing
              businesses.
            </h1>
          </div>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          id="features"
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container">
            <h3 className="text-xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
              Why Choose Us?
            </h3>
            <section className="container px-4 py-16" id="features">
              <FeatureCards />
            </section>
          </div>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 rounded-lg"
        >
          <HowItWorksSection />
        </motion.section>
        {/* Other sections follow the same structure */}
        {/* Keep all your sections, wrapping them in `motion.section` with fadeIn variants */}
        <section className="container px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Is there a free trial available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can try LendRent free for 14 days. No credit card
                  required.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I export my data?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can export your data in various formats including PDF
                  and Excel.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  We use bank-level encryption to ensure your data is always
                  secure and private.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards, PayPal, and bank transfers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className=" px-4 py-16">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center p-16 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to streamline your business?
              </h2>
              <p className="mt-4 mb-8 text-xl">
                Join thousands of business owners who trust LendRent
              </p>
              <Button size="lg" variant="secondary">
                <SignInButton>
                  <div className="flex items-center">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </SignInButton>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 lg:px-10 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 LendRent Portal. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
}
