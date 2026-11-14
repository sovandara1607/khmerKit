import { Header } from "../../../components/Header";
import { Playground } from "../../../components/Playground";
export default function NormalizationPage() { return <><Header /><main className="section-wrap page-shell"><p className="eyebrow">Playground / normalization</p><h1>See what changes.</h1><p className="page-lede">Compare a Khmer-specific profile with generic Unicode handling using the live API.</p><Playground initialMode="normalize" /></main></>; }
