import Image from "next/image";

export function TwinAvatar({
  large = false,
  typing = false,
}: {
  large?: boolean;
  typing?: boolean;
}) {
  return (
    <span
      className={`twin-character${large ? " twin-character-large" : ""}${typing ? " twin-character-typing" : ""}`}
      aria-hidden="true"
    >
      <Image
        src="/twin-idle.png"
        data-active={!typing}
        alt=""
        fill
        sizes={large ? "132px" : "56px"}
      />
      <Image
        src="/twin-typing.png"
        data-active={typing}
        alt=""
        fill
        sizes={large ? "132px" : "56px"}
      />
    </span>
  );
}
