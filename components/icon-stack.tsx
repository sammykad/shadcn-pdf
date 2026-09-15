// Title: Icon Stack
// Description: Layered icon illustration container with a traveling light
// that laps each card's outline in turn, on an endless self-looping cycle
"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type IconStackProps = React.ComponentProps<"div">

function IconStack({ className, children, style, ...props }: IconStackProps) {
  const svgRef = React.useRef<SVGSVGElement>(null)

  // SMIL (<animate>) isn't controllable via CSS animation-play-state, so
  // pause it in JS for people who've asked for reduced motion.
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => {
      const svg = svgRef.current
      if (!svg) return
      mq.matches ? svg.pauseAnimations() : svg.unpauseAnimations()
    }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return (
    <div
      data-slot="icon-stack"
      className={cn(
        "text-foreground **:data-[slot=icon-stack-layer]:fill-background relative h-20 w-18",
        className
      )}
      style={
        {
          "--icon-stack-content-x": "71%",
          "--icon-stack-content-y": "58%",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <svg
        ref={svgRef}
        aria-hidden="true"
        viewBox="0 0 72 81"
        fill="none"
        className="h-full w-full overflow-visible"
      >
        <ellipse
          cx="36"
          cy="76"
          rx="30"
          ry="7"
          fill="currentColor"
          fillOpacity="0.055"
          className="blur-[4px]"
        />

        {/*
          One shared 3.6s cycle, split into three equal thirds — no
          animation ever waits on another element's id/event, so there's
          nothing that can desync or stop after one pass. Each layer is
          only visible (opacity discrete on/off) during its own third,
          traveling its outline while it's on.
        */}
        <IconStackLayer
          opacity="0.4"
          dashValues="0;100;100;100"
          opacityKeyTimes="0;0.3333"
          opacityValues="1;0"
        />
        <IconStackLayer
          opacity="0.6"
          x={13.65}
          y={6.04}
          dashValues="100;100;0;0"
          opacityKeyTimes="0;0.3333;0.6667"
          opacityValues="0;1;0"
        />
        <IconStackLayer
          opacity="0.8"
          x={27.32}
          y={12.08}
          active
          dashValues="0;0;0;100"
          opacityKeyTimes="0;0.6667"
          opacityValues="0;1"
        />
      </svg>

      {children ? (
        <div
          data-slot="icon-stack-content"
          className="text-muted-foreground pointer-events-none absolute top-[var(--icon-stack-content-y)] left-[var(--icon-stack-content-x)] flex -translate-x-1/2 -translate-y-1/2 scale-x-90 -skew-y-26 items-center justify-center"
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}

const CYCLE_DUR = "3.6s"
const DASH_KEY_TIMES = "0;0.3333;0.6667;1"

const CARD_PATH_1 =
  "M42.2538 2.046C41.4408 1.6325 40.3965 1.6677 39.2612 2.2424L7.9616 18.1934C5.3895 19.5039 3.301 23.1064 3.301 26.2322V64.3226C3.301 66.0677 3.9458 67.2943 4.962 67.8199L1.8363 66.229C0.8201 65.7104 0.1753 64.4771 0.1753 62.732V24.6412C0.1753 21.5085 2.2638 17.913 4.8359 16.6024L36.1355 0.6515C37.2778 0.0698 38.322 0.0416 39.128 0.4551L42.2538 2.046Z"

const CARD_PATH_2 =
  "M42.2545 2.0456C43.2707 2.5643 43.9155 3.7979 43.9155 5.543V43.6337C43.9155 46.7665 41.827 50.3616 39.2549 51.6722L7.9554 67.6235C6.813 68.2052 5.7687 68.2331 4.9628 67.8196C3.9465 67.301 3.3018 66.0673 3.3018 64.3222V26.2318C3.3018 23.0991 5.3903 19.5036 7.9624 18.193L39.2619 2.2421C40.4043 1.6604 41.4486 1.6321 42.2545 2.0456Z"

function IconStackLayer({
  active = false,
  opacity,
  x = 0,
  y = 0,
  dashValues,
  opacityKeyTimes,
  opacityValues,
}: {
  active?: boolean
  opacity: string
  x?: number
  y?: number
  dashValues: string
  opacityKeyTimes: string
  opacityValues: string
}) {
  return (
    <g opacity={opacity} transform={`translate(${x} ${y})`}>
      <path
        data-slot="icon-stack-layer"
        d={CARD_PATH_1}
        stroke="currentColor"
        strokeOpacity={active ? "0.3" : "0.2"}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        data-slot="icon-stack-layer"
        d={CARD_PATH_2}
        stroke="currentColor"
        strokeOpacity={active ? "0.35" : "0.25"}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* soft glow trailing the light */}
      <path
        d={CARD_PATH_1}
        fill="none"
        pathLength={100}
        stroke="oklch(0.7 0.15 235)"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="14 86"
        className="blur-[1.5px]"
      >
        <animate
          attributeName="stroke-dashoffset"
          values={dashValues}
          keyTimes={DASH_KEY_TIMES}
          dur={CYCLE_DUR}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values={opacityValues}
          keyTimes={opacityKeyTimes}
          calcMode="discrete"
          dur={CYCLE_DUR}
          repeatCount="indefinite"
        />
      </path>
      {/* bright core of the light — same timeline */}
      <path
        d={CARD_PATH_1}
        fill="none"
        pathLength={100}
        stroke="oklch(0.9 0.08 235)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeDasharray="14 86"
      >
        <animate
          attributeName="stroke-dashoffset"
          values={dashValues}
          keyTimes={DASH_KEY_TIMES}
          dur={CYCLE_DUR}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values={opacityValues}
          keyTimes={opacityKeyTimes}
          calcMode="discrete"
          dur={CYCLE_DUR}
          repeatCount="indefinite"
        />
      </path>
    </g>
  )
}

export { IconStack, type IconStackProps }