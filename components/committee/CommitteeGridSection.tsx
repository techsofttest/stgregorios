
"use client";

import { useState } from "react";
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
        {/* Dynamic category filters */}
        <ScrollReveal direction="up" duration={700}>
          <div className="mb-14 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:text-sm ${
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
                className={`rounded-none border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 sm:text-sm ${
                  selectedCategory === category.name
                    ? "border-[#a43a32] bg-[#a43a32] text-white shadow-sm"
                    : "border-[#171715]/10 bg-white text-[#3d3a34] hover:border-[#a43a32] hover:text-[#a43a32]"
                }`}
              >
                {category.name}
              </button>
            ))}
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
