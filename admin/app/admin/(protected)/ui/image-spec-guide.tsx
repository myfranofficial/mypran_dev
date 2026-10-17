export interface ImageSpec {
  label: string;
  size: string;
  ratio: string;
  note?: string;
}

export function ImageSpecGuide({ specs }: { specs: ImageSpec[] }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm">
      <p className="font-bold text-amber-800 mb-2">이미지 규격 안내</p>
      <ul className="space-y-1 text-amber-900">
        {specs.map((s) => (
          <li key={s.label}>
            <span className="font-medium">{s.label}:</span>{" "}
            {s.size} ({s.ratio})
            {s.note && <span className="text-amber-600"> · {s.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
