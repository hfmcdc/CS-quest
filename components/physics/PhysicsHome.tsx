import Link from "next/link";
import Icon from "@/components/Icon";
import BetaBanner from "@/components/BetaBanner";
import { BackLink, PageHeader } from "@/components/ui";
import { PHYS_CHAPTERS, WEIGHT_GROUPS, physChapterHref, weightLabel } from "@/lib/physics/chapters";

/** Physics chapter list: all 14 chapters, grouped by the official CBSE unit groups. Static, so it renders instantly and prefetches with the route. */
export default function PhysicsHome() {
  return (
    <>
      <BetaBanner />
      <main className="theme-phys ph-wide">
        <div className="mb-8" style={{ marginBottom: "1.75rem" }}><BackLink href="/">Home</BackLink></div>
        <PageHeader title="Physics" icon={<Icon name="atom" size={24} />}>CBSE Class XII, 2026–27 syllabus. Choose a chapter, then pick flashcards, practice, equation identification or advanced numericals.</PageHeader>
        <p className="ph-notice" style={{ marginTop: "-.25rem", marginBottom: "2rem" }}>
          <b>About the marks.</b> CBSE publishes marks for each group of units, not for individual chapters. Each card shows the group it belongs to; the marks are shared by the whole group.
        </p>

        {WEIGHT_GROUPS.map((g) => {
          const chs = PHYS_CHAPTERS.filter((c) => g.chapters.includes(c.number));
          const first = chs[0].number;
          const last = chs[chs.length - 1].number;
          return (
            <section key={g.id} className="ph-group" aria-label={`${g.unitLabel}`}>
              <div className="ph-grouphead">
                <h2>{g.unitLabel}</h2>
                <p>{chs.length > 1 ? `Chapters ${first}–${last} together: ${g.marks} marks` : `Chapter ${first}: ${g.marks} marks`}</p>
              </div>
              <div className="stagger ph-grid">
                {chs.map((c) => (
                  <Link key={c.slug} href={physChapterHref(c.slug)} prefetch={false} className="card card-link fx-spot fx-edge ph-ch">
                    <div className="ph-ch-head">
                      <span className="ph-num" aria-hidden="true">{c.number}</span>
                      <div style={{ minWidth: 0 }}>
                        <p className="ph-eyebrow" style={{ margin: 0 }}>Chapter {c.number}</p>
                        <h3>{c.title}</h3>
                      </div>
                    </div>
                    <p>{c.desc}</p>
                    <div className="ph-foot">
                      <span className="ph-weight" title="Marks are shared by the whole unit group, not per chapter">{weightLabel(c.number)}</span>
                      <span className="ph-go">Open<Icon name="forward" size={16} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        <p className="mt-10 text-center text-xs text-slate-500" style={{ marginTop: "2.5rem", textAlign: "center", fontSize: ".75rem", color: "#7d86a3" }}>Questions follow the CBSE Class XII syllabus and NCERT. Nothing is saved.</p>
      </main>
    </>
  );
}
