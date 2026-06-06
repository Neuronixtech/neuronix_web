import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { NeuralNetwork3D } from "@/components/ui/NeuralNetwork3D";

/**
 * @typedef {{ text: string; highlight: string }} Phrase
 */

const PHRASES = [
  { text: "Something Amazing Together", highlight: "Amazing Together" },
  { text: "Intelligent AI Solutions", highlight: "AI Solutions" },
  { text: "Future-Ready Products", highlight: "Future-Ready Products" },
  { text: "Smart Automation", highlight: "Smart Automation" },
]

/**
 * @param {Phrase[]} phrases
 * @param {number} [typingSpeed]
 * @param {number} [deletingSpeed]
 * @param {number} [pauseDuration]
 * @returns {{ displayText: string; highlight: string }}
 */
function useTypewriter(phrases, typingSpeed = 55, deletingSpeed = 28, pauseDuration = 2200) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    if (pauseRef.current) return;

    const current = phrases[phraseIdx].text;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          pauseRef.current = true;
          setTimeout(() => {
            pauseRef.current = false;
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return { displayText, highlight: phrases[phraseIdx].highlight };
}

/**
 * @param {{ target: number; suffix?: string; duration?: number }} props
 */
function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    let timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

/**
 * @param {{ index: number }} props
 */
function FloatingParticle({ index }) {
  const x = useRef(Math.random() * 100);
  const y = useRef(Math.random() * 100);
  const size = useRef(2 + Math.random() * 4);
  const duration = useRef(4 + Math.random() * 6);
  const delay = useRef(Math.random() * 5);

  return (
    <div
      className="absolute rounded-full bg-primary/30 pointer-events-none"
      style={{
        left: `${x.current}%`,
        top: `${y.current}%`,
        width: size.current,
        height: size.current,
        animation: `floatParticle ${duration.current}s ease-in-out ${delay.current}s infinite`,
        boxShadow: `0 0 ${size.current * 3}px rgba(255,92,51,0.3)`,
      }}
    />
  );
}

const FLOATING_PARTICLES = Array.from({ length: 15 }, (_, i) => i);

export function HeroSection() {
  const { displayText, highlight } = useTypewriter(PHRASES);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const highlightIdx = displayText.indexOf(highlight);

  const stats = [
    { value: 25, suffix: "+", label: "Projects Done" },
    { value: 10, suffix: "+", label: "Technologies" },
    { value: 6, suffix: "+", label: "Developers" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Neural network background */}
      <div className="absolute inset-0 z-0">
        <NeuralNetwork3D variant="hero" className="w-full h-full" />
      </div>

      {/* Orange glow orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-15%] right-[-10%] w-[70%] h-[70%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,92,51,0.12) 0%, transparent 70%)",
            animation: "pulseGlow 5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,92,51,0.08) 0%, transparent 70%)",
            animation: "pulseGlow 7s ease-in-out infinite 1s",
          }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[40%] h-[40%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,92,51,0.06) 0%, transparent 70%)",
            animation: "pulseGlow 6s ease-in-out infinite 2s",
          }}
        />
      </div>

      {/* Gradient vignette */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/70 via-transparent to-background/95" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      {/* Moving decorative lines */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden opacity-15">
        <div className="hero-line-1 absolute top-[20%] left-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="hero-line-2 absolute top-[70%] right-0 w-[35%] h-[1px] bg-gradient-to-l from-transparent via-primary/50 to-transparent" />
        <div className="hero-line-3 absolute left-[10%] top-0 w-[1px] h-[50%] bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        <div className="hero-line-1 absolute top-[45%] left-0 w-[30%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" style={{ animationDelay: "-6s" }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {FLOATING_PARTICLES.map((i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-between py-16 sm:py-20 lg:py-24"
      >
        <div />

        <div className="flex flex-col justify-center flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold font-heading tracking-tight leading-[1.05] mb-5 sm:mb-6 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
          >
            <span className="text-foreground">Let&apos;s Build </span>
            <span className="typing-cursor inline">
              {highlightIdx >= 0 ? (
                <>
                  <span className="text-foreground">{displayText.slice(0, highlightIdx)}</span>
                  <span className="text-gradient-orange">{displayText.slice(highlightIdx, highlightIdx + highlight.length)}</span>
                  <span className="text-foreground">{displayText.slice(highlightIdx + highlight.length)}</span>
                </>
              ) : (
                <span className="text-foreground">{displayText}</span>
              )}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-3xl"
          >
            Neuronix Technology builds scalable AI solutions, web applications, mobile apps, cloud platforms, WhatsApp automation, AI chatbots, call bots, and enterprise software for startups and modern businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl glow-orange hover:scale-[1.04] hover:brightness-110 transition-all duration-300 text-sm sm:text-base group"
            >
              Get Free Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] text-foreground font-semibold rounded-xl hover:border-primary/30 hover:bg-white/[0.06] hover:shadow-[0_0_25px_rgba(255,92,51,0.15)] transition-all duration-300 text-sm sm:text-base group"
            >
              <Sparkles size={16} className="group-hover:text-primary transition-colors" />
              Start a Project
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 sm:pt-10 lg:pt-12 border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 lg:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-foreground">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
