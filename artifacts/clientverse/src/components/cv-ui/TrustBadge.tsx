import {
  Medal,
  ShieldCheck,
  CheckCircle,
  Lightning,
  Lock,
  Buildings,
  Funnel,
  ChartBar,
} from "@phosphor-icons/react";

const BADGES = {
  "veteran-founded": { Icon: Medal, label: "Veteran-Founded" },
  "secure-infrastructure": { Icon: ShieldCheck, label: "Secure Infrastructure" },
  "crm-automation-ready": { Icon: CheckCircle, label: "CRM + Automation Ready" },
  "ai-workflow-ready": { Icon: Lightning, label: "AI Workflow Ready" },
  "privacy-conscious": { Icon: Lock, label: "Privacy-Conscious Systems" },
  "service-businesses": { Icon: Buildings, label: "Built for Service Businesses" },
  "lead-capture": { Icon: Funnel, label: "Lead Capture + Follow-Up Engine" },
  "revenue-audit": { Icon: ChartBar, label: "Revenue Audit Framework" },
} as const;

export type TrustBadgeKey = keyof typeof BADGES;

interface TrustBadgeStripProps {
  badges: TrustBadgeKey[];
  className?: string;
}

export function TrustBadgeStrip({ badges, className = "" }: TrustBadgeStripProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {badges.map((key) => {
        const { Icon, label } = BADGES[key];
        return (
          <div
            key={key}
            className="inline-flex items-center gap-1.5 bg-[#0D1B2E] border border-[#1E2D4A] rounded-lg px-3 py-1.5"
          >
            <Icon size={12} color="#4AC4E0" weight="fill" />
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
