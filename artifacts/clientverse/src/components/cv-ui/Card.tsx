import * as React from "react";
import { CVButtonLink } from "./Button";

type CardVariant =
  | "feature"
  | "trust"
  | "dashboard"
  | "pricing"
  | "pricingFeatured"
  | "objection"
  | "case";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
  variant?: CardVariant;
  interactive?: boolean;
};

type CardHeaderProps = {
  label?: string;
  title: string;
  eyebrow?: React.ReactNode;
  children?: React.ReactNode;
};

export type FeatureCardProps = {
  label: string;
  title: string;
  copy: string;
  badge?: string;
  icon?: React.ReactNode;
  href?: string;
  ctaLabel?: string;
};

export type TrustCardProps = {
  label?: string;
  title: string;
  proof: string;
  badge?: string;
};

export type DashboardCardProps = {
  label: string;
  title: string;
  metric: string;
  metricLabel: string;
  context: string;
  status?: "connected" | "active" | "attention" | "risk";
};

export type PricingCardProps = {
  tier: string;
  fit: string;
  price: string;
  features: string[];
  featured?: boolean;
  ctaHref: string;
  ctaLabel?: string;
  badge?: string;
};

export type ObjectionCardProps = {
  objection: string;
  answer: string;
  proofNote?: string;
};

export type CaseCardProps = {
  industry: string;
  title: string;
  problem: string;
  intervention: string;
  result: string;
  href?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const variantClass: Record<CardVariant, string> = {
  feature: "cv-card--feature",
  trust: "cv-card--trust",
  dashboard: "cv-card--dashboard",
  pricing: "cv-card--pricing",
  pricingFeatured: "cv-card--pricing cv-card--pricing-featured",
  objection: "cv-card--objection",
  case: "cv-card--case",
};

export function CVCard({
  as: Component = "article",
  variant = "feature",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cx(
        "cv-card",
        variantClass[variant],
        interactive && "cv-card--interactive",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CVCardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx("cv-card__body", className)} {...props}>
      {children}
    </div>
  );
}

export function CVCardHeader({ label, title, eyebrow, children }: CardHeaderProps) {
  return (
    <>
      {eyebrow ? <div className="cv-card__badge">{eyebrow}</div> : null}
      {label ? <p className="cv-card__label">{label}</p> : null}
      <h3 className="cv-card__title">{title}</h3>
      {children}
    </>
  );
}

export function CVFeatureCard({
  label,
  title,
  copy,
  badge,
  icon,
  href,
  ctaLabel = "Learn More",
}: FeatureCardProps) {
  return (
    <CVCard variant="feature" interactive={Boolean(href)}>
      <CVCardBody>
        {badge ? <span className="cv-card__badge">{badge}</span> : null}
        {icon ? <div aria-hidden="true" style={{ marginBottom: "1rem" }}>{icon}</div> : null}
        <CVCardHeader label={label} title={title} />
        <p className="cv-card__copy">{copy}</p>
        {href ? (
          <div className="cv-card__actions">
            <CVButtonLink href={href} variant="secondary" size="sm">
              {ctaLabel}
            </CVButtonLink>
          </div>
        ) : null}
      </CVCardBody>
    </CVCard>
  );
}

export function CVTrustCard({
  label = "// VERIFIED",
  title,
  proof,
  badge,
}: TrustCardProps) {
  return (
    <CVCard variant="trust">
      <CVCardBody>
        {badge ? <span className="cv-card__badge">{badge}</span> : null}
        <CVCardHeader label={label} title={title} />
        <p className="cv-card__copy">{proof}</p>
      </CVCardBody>
    </CVCard>
  );
}

export function CVDashboardCard({
  label,
  title,
  metric,
  metricLabel,
  context,
  status = "active",
}: DashboardCardProps) {
  const statusText = {
    connected: "Connected",
    active: "Active",
    attention: "Attention",
    risk: "Risk detected",
  }[status];

  return (
    <CVCard variant="dashboard">
      <CVCardBody>
        <span className="cv-card__badge">{statusText}</span>
        <CVCardHeader label={label} title={title} />
        <div className="cv-card-metric" aria-label={`${metricLabel}: ${metric}`}>
          <span className="cv-card-metric__value">{metric}</span>
          <span className="cv-card-metric__label">{metricLabel}</span>
        </div>
        <p className="cv-card__meta">{context}</p>
      </CVCardBody>
    </CVCard>
  );
}

export function CVPricingCard({
  tier,
  fit,
  price,
  features,
  featured = false,
  ctaHref,
  ctaLabel,
  badge,
}: PricingCardProps) {
  const defaultCta = featured ? "Get Started" : "View Scope";
  return (
    <CVCard variant={featured ? "pricingFeatured" : "pricing"}>
      <CVCardBody>
        {badge ? <span className="cv-card__badge">{badge}</span> : null}
        <CVCardHeader label="// ENGAGEMENT MODEL" title={tier} />
        <p className="cv-card__copy">{fit}</p>
        <div className="cv-card-metric" aria-label={`Investment: ${price}`}>
          <span className="cv-card-metric__value">{price}</span>
        </div>
        <ul className="cv-pricing-list">
          {features.slice(0, 8).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="cv-card__actions">
          <CVButtonLink
            href={ctaHref}
            variant={featured ? "primary" : "secondary"}
            fullWidth
          >
            {ctaLabel ?? defaultCta}
          </CVButtonLink>
        </div>
      </CVCardBody>
    </CVCard>
  );
}

export function CVObjectionCard({ objection, answer, proofNote }: ObjectionCardProps) {
  return (
    <CVCard variant="objection">
      <CVCardBody>
        <CVCardHeader label="// OBJECTION" title={objection} />
        <p className="cv-card__copy">{answer}</p>
        {proofNote ? <p className="cv-card__meta">{proofNote}</p> : null}
      </CVCardBody>
    </CVCard>
  );
}

export function CVCaseCard({
  industry,
  title,
  problem,
  intervention,
  result,
  href,
}: CaseCardProps) {
  return (
    <CVCard variant="case" interactive={Boolean(href)}>
      <CVCardBody>
        <CVCardHeader label={industry} title={title} />
        <p className="cv-card__copy"><strong>Problem:</strong> {problem}</p>
        <p className="cv-card__copy"><strong>Intervention:</strong> {intervention}</p>
        <p className="cv-card__meta"><strong>Result:</strong> {result}</p>
        {href ? (
          <div className="cv-card__actions">
            <CVButtonLink href={href} variant="secondary" size="sm">
              Read Full Case Study
            </CVButtonLink>
          </div>
        ) : null}
      </CVCardBody>
    </CVCard>
  );
}
