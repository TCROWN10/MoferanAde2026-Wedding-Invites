"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type GiftAccount = {
  owner: string;
  bank: string;
  number: string;
  name: string;
  tone: "emerald" | "gold";
};

const ACCOUNTS: GiftAccount[] = [
  { owner: "Feranmi", bank: "Zenith Bank", number: "2437513072", name: "Soje Anuoluwapo Deborah", tone: "emerald" },
  { owner: "Ademola", bank: "UBA", number: "2129725932", name: "Emmanuel Segun Ademola", tone: "gold" },
];

function groupDigits(n: string) {
  return n.replace(/^(\d{3})(\d{3})(\d+)$/, "$1 $2 $3");
}

function Chip() {
  return (
    <svg className="gift-card-chip" viewBox="0 0 48 36" aria-hidden>
      <defs>
        <linearGradient id="gift-chip-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7e7ce" />
          <stop offset="0.5" stopColor="#c9a961" />
          <stop offset="1" stopColor="#f3dfa8" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="47" height="35" rx="6" fill="url(#gift-chip-gold)" stroke="#9c7c3c" />
      <path
        d="M16 0.5v35M32 0.5v35M0.5 12h15.5M32 12h15.5M0.5 24h15.5M32 24h15.5M16 18h16"
        stroke="#9c7c3c"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function Contactless() {
  return (
    <svg className="gift-card-contactless" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M8 8.5a5 5 0 010 7" />
      <path d="M11.5 6a9 9 0 010 12" />
      <path d="M15 3.5a13 13 0 010 17" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

type CopyTarget = "all" | "bank" | "number" | "name";

const COPY_LABELS: Record<CopyTarget, string> = {
  all: "account details",
  bank: "bank name",
  number: "account number",
  name: "account name",
};

function FieldCopyButton({
  copied,
  label,
  onClick,
}: {
  copied: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="gift-card-field-copy" aria-label={label}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

function GiftCard({ account }: { account: GiftAccount }) {
  const [copied, setCopied] = useState<CopyTarget | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = useCallback(
    async (target: CopyTarget) => {
      const text = {
        all: `${account.name}\n${account.number}\n${account.bank}`,
        bank: account.bank,
        number: account.number,
        name: account.name,
      }[target];
      try {
        await navigator.clipboard.writeText(text);
        setCopied(target);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(null), 2200);
      } catch {
        // clipboard unavailable
      }
    },
    [account],
  );

  return (
    <div className={`gift-card gift-card--${account.tone}`}>
      <div className="gift-card-shine" aria-hidden />
      <span className="gift-card-monogram" aria-hidden>
        {account.owner[0]}
      </span>

      <div className="gift-card-top">
        <div className="min-w-0">
          <p className="gift-card-eyebrow">For {account.owner}</p>
          <div className="gift-card-field">
            <p className="gift-card-bank">{account.bank}</p>
            <FieldCopyButton
              copied={copied === "bank"}
              label={`Copy ${account.owner}'s bank name`}
              onClick={() => copy("bank")}
            />
          </div>
        </div>
      </div>

      <div className="gift-card-chip-row">
        <Chip />
        <Contactless />
        <button
          type="button"
          onClick={() => copy("all")}
          className="gift-card-copy"
          aria-label={`Copy all of ${account.owner}'s account details`}
        >
          {copied === "all" ? <CheckIcon /> : <CopyIcon />}
          <span>{copied === "all" ? "Copied" : "Copy all"}</span>
        </button>
      </div>

      <div className="gift-card-field gift-card-field--number">
        <p className="gift-card-number" aria-label={`Account number ${account.number.split("").join(" ")}`}>
          {groupDigits(account.number)}
        </p>
        <FieldCopyButton
          copied={copied === "number"}
          label={`Copy ${account.owner}'s account number`}
          onClick={() => copy("number")}
        />
      </div>

      <div className="gift-card-holder">
        <p className="gift-card-eyebrow">Account name</p>
        <div className="gift-card-field">
          <p className="gift-card-name">{account.name}</p>
          <FieldCopyButton
            copied={copied === "name"}
            label={`Copy ${account.owner}'s account name`}
            onClick={() => copy("name")}
          />
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? `${account.owner}'s ${COPY_LABELS[copied]} copied` : ""}
      </span>
    </div>
  );
}

export default function GiftCards() {
  return (
    <div className="gift-cards">
      {ACCOUNTS.map((account) => (
        <GiftCard key={account.number} account={account} />
      ))}
    </div>
  );
}
