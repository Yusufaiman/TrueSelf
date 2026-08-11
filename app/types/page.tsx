import { TrueSelfTypesExplorer } from "@/components/types/TrueSelfTypesExplorer";
import { getAllTrueSelf16Profiles } from "@/lib/trueself-16/engine";
import {
  TYPE_FAMILIES,
  TYPE_FAMILY_BY_CODE,
} from "@/lib/trueself-16/layers";
import type { TypeFamily } from "@/lib/trueself-16/types";

export default function TypesPage() {
  const profiles = getAllTrueSelf16Profiles();
  const families = (Object.keys(TYPE_FAMILIES) as TypeFamily[]).map(
    (familyCode) => ({
      ...TYPE_FAMILIES[familyCode],
      profiles: profiles.filter(
        (profile) => TYPE_FAMILY_BY_CODE[profile.code] === familyCode,
      ),
    }),
  );

  return <TrueSelfTypesExplorer profiles={profiles} families={families} />;
}
