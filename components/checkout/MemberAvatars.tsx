export default function MemberAvatars() {
  const members = [
    { webp: "https://assets.superpower.com/website/checkout/autopilot-member-1.webp", fallback: "https://assets.superpower.com/website/checkout/autopilot-member-1.png" },
    { webp: "https://assets.superpower.com/website/checkout/autopilot-member-2.webp", fallback: "https://assets.superpower.com/website/checkout/autopilot-member-2.png" },
    { webp: "https://assets.superpower.com/website/checkout/autopilot-member-3.webp", fallback: "https://assets.superpower.com/website/checkout/autopilot-member-3.png" },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {members.map((member, index) => (
          <div key={index} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
            <picture>
              <source srcSet={member.webp} type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.fallback}
                alt="Superpower member"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        ))}
      </div>
      <span className="typography-web-body-sm text-secondary-foreground">
        Trusted by thousands of members.
      </span>
    </div>
  );
}
