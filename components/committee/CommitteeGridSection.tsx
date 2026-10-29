"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CommitteeMemberCard from "@/components/committee/CommitteeMemberCard";

interface CommitteeCategory {
  id: number;
  name: string;
}

interface CommitteeMemberItem {
  id: number;
  category_id: number;
  category: string;
  name: string;
  position: string;
  phone: string;
  image: string | null;
  isVicar: boolean;
}

interface CommitteeGridSectionProps {
  members: CommitteeMemberItem[];
  categories: CommitteeCategory[];
}

export default function CommitteeGridSection({
  members,
  categories,
}: CommitteeGridSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | "All">(
    "All"
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Convert vertical mouse wheel scrolling into horizontal scrolling when hovering
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const filteredMembers =
    selectedCategory === "All"
      ? members
      : members.filter(
          (member) => member.category === selectedCategory
        );

  const officeBearers = members.filter(
    (member) =>
      member.category.toLowerCase() === "office bearers"
  );

  const managingCommittee = members.filter(
    (member) => member.category.toLowerCase() === "mc members"
  );

  const auditorsAndCouncil = members.filter((member) => {
    const category = member.category.toLowerCase();

    return (
      category === "internal auditors" ||
      category === "diocese council members"
    );
  });

  const renderMembers = (items: CommitteeMemberItem[]) => (
    <div className="grid grid-cols-2 items-end gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
      {items.map((member, idx) => (
        <ScrollReveal
          key={member.id}
          direction="up"
          delay={(idx % 5) * 80}
          duration={700}
          className={
            member.isVicar
              ? "col-span-2 sm:col-span-1"
              : ""
          }
        >
          <CommitteeMemberCard member={member} />
        </ScrollReveal>
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#f7f4ed] py-16 lg:py-24">
      {/* Background sketch */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none overflow-hidden opacity-[0.1] mix-blend-multiply">
        <Image
          src="/sketch/sk1.png"
          alt=""
          fill
          priority={false}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ed] via-transparent to-[#f7f4ed]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-12 lg:px-16">
        {/* Dynamic category filters with smooth horizontal scroll & drag support */}
        <ScrollReveal direction="up" duration={700}>
          <div className="relative mb-14">
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 pt-1 touch-pan-x select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`flex-shrink-0 whitespace-nowrap rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:text-sm cursor-pointer ${
                  selectedCategory === "All"
                    ? "border-[#a43a32] bg-[#a43a32] text-white shadow-sm"
                    : "border-[#171715]/10 bg-white text-[#3d3a34] hover:border-[#a43a32] hover:text-[#a43a32]"
                }`}
              >
                All Members
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-shrink-0 whitespace-nowrap rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:text-sm cursor-pointer ${
                    selectedCategory === category.name
                      ? "border-[#a43a32] bg-[#a43a32] text-white shadow-sm"
                      : "border-[#171715]/10 bg-white text-[#3d3a34] hover:border-[#a43a32] hover:text-[#a43a32]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Selected category: show a single filtered grid */}
        {selectedCategory !== "All" ? (
          filteredMembers.length > 0 ? (
            renderMembers(filteredMembers)
          ) : (
            <p className="py-12 text-center text-[#3d3a34]">
              No committee members found in this category.
            </p>
          )
        ) : (
          <div className="space-y-20">
            {/* Office Bearers */}
            {officeBearers.length > 0 && (
              <div id="office-bearers">
                <ScrollReveal direction="up" duration={700}>
                  <div className="mb-8 border-b border-[#171715]/10 pb-4">
                    <p className="eyebrow text-[#a43a32]">
                      Executive Stewardship
                    </p>
                    <h2 className="section-title mt-1">
                      Vicar &amp; Office{" "}
                      <span className="text-[#a43a32]">Bearers</span>
                    </h2>
                  </div>
                </ScrollReveal>

                {renderMembers(officeBearers)}
              </div>
            )}

            {/* Managing Committee */}
            {managingCommittee.length > 0 && (
              <div id="members">
                <ScrollReveal direction="up" duration={700}>
                  <div className="mb-8 border-b border-[#171715]/10 pb-4">
                    <p className="eyebrow text-[#a43a32]">
                      Parish Administration
                    </p>
                    <h2 className="section-title mt-1">
                      Managing Committee{" "}
                      <span className="text-[#a43a32]">Members</span>
                    </h2>
                  </div>
                </ScrollReveal>

                {renderMembers(managingCommittee)}
              </div>
            )}

            {/* Auditors and Council */}
            {auditorsAndCouncil.length > 0 && (
              <div id="auditor">
                <ScrollReveal direction="up" duration={700}>
                  <div className="mb-8 border-b border-[#171715]/10 pb-4">
                    <p className="eyebrow text-[#a43a32]">
                      Audit &amp; Diocesan Oversight
                    </p>
                    <h2 className="section-title mt-1">
                      Internal Auditor &amp;{" "}
                      <span className="text-[#a43a32]">
                        Council Members
                      </span>
                    </h2>
                  </div>
                </ScrollReveal>

                {renderMembers(auditorsAndCouncil)}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}