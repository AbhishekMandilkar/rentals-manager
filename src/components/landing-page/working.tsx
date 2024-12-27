import React from "react";
const data = {
  type: "section",
  className: "container px-4 bg-muted/50",
  header: {
    title: "How It Works",
    description: "Get started in three simple steps",
  },
  steps: [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your account and set up your business profile",
    },
    {
      number: 2,
      title: "Add Your Data",
      description: "Input your loans and rental properties information",
    },
    {
      number: 3,
      title: "Start Managing",
      description: "Track payments, generate reports, and grow your business",
    },
  ],
};
const HowItWorksSection = () => {
  return (
    <section className={data.className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {data.header.title}
        </h2>
        <p className="mt-4 text-muted-foreground">{data.header.description}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {data.steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 text-2xl">
              {step.number}
            </div>
            <h3 className="text-2xl font-semibold">{step.title}</h3>
            <p className="mt-2 mx-10 text-md font-geist-mono text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default HowItWorksSection