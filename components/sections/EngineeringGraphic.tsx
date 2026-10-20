import { ArrowUpRight, ChevronRight, Crosshair } from "lucide-react";

export function EngineeringGraphic() {
  return (
    <div className="engineering-graphic" aria-hidden="true">
      <div className="graphic-coordinate">01 / ENGINEERING</div>
      <div className="graphic-orbit" />
      <div className="graphic-panel graphic-panel-pink">
        <div className="graphic-panel-top">
          <span>BUILD / CONNECT</span>
          <span>+++</span>
        </div>
        <div className="graphic-chevrons">
          <ChevronRight />
          <ChevronRight />
          <ChevronRight />
        </div>
        <p className="graphic-word">
          BACK
          <br />
          END<span>_</span>
        </p>
        <span className="graphic-caption">APIs / JOB QUEUES / DATA</span>
        <div className="graphic-stripes" />
      </div>
      <div className="graphic-panel graphic-panel-lime">
        <div className="graphic-panel-top">
          <Crosshair className="size-7" />
          <span>DEPLOY / OBSERVE</span>
        </div>
        <p className="graphic-word">
          INFRA
          <ArrowUpRight className="graphic-word-arrow" />
        </p>
        <span className="graphic-caption">
          CLOUD / CONTAINERS / RELIABILITY
        </span>
        <div className="graphic-panel-bottom">
          <span className="graphic-barcode" />
          <ArrowUpRight className="size-12" />
        </div>
      </div>
      <div className="graphic-coordinate graphic-coordinate-bottom">
        SOFTWARE / SYSTEMS / AI
      </div>
    </div>
  );
}
