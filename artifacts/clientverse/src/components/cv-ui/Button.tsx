import * as React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "secondaryInverse"
  | "ghost"
  | "icon"
  | "destructive";

type ButtonSize = "sm" | "md" | "lg";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  mobileFull?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

type ButtonProps = ButtonOwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = ButtonOwnProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "cv-btn--primary",
  secondary: "cv-btn--secondary",
  secondaryInverse: "cv-btn--secondary-inverse",
  ghost: "cv-btn--ghost",
  icon: "cv-btn--icon",
  destructive: "cv-btn--destructive",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "cv-btn--sm",
  md: "cv-btn--md",
  lg: "cv-btn--lg",
};

function buildClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  mobileFull,
  className,
}: ButtonOwnProps & { className?: string }) {
  return cx(
    "cv-btn",
    variantClass[variant],
    variant !== "icon" && sizeClass[size],
    fullWidth && "cv-btn--full",
    mobileFull && "cv-btn--mobile-full",
    className
  );
}

export function CVButton({
  variant = "primary",
  size = "md",
  fullWidth = false,
  mobileFull = false,
  leftIcon,
  rightIcon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buildClasses({ variant, size, fullWidth, mobileFull, className })}
      {...props}
    >
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
}

export function CVButtonLink({
  variant = "primary",
  size = "md",
  fullWidth = false,
  mobileFull = false,
  leftIcon,
  rightIcon,
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const isDisabled =
    props["aria-disabled"] === true || props["aria-disabled"] === "true";

  return (
    <a
      href={isDisabled ? undefined : href}
      className={buildClasses({ variant, size, fullWidth, mobileFull, className })}
      {...props}
    >
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </a>
  );
}

export type { ButtonProps as CVButtonProps, ButtonLinkProps as CVButtonLinkProps, ButtonVariant as CVButtonVariant, ButtonSize as CVButtonSize };
