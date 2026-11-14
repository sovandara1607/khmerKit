import { Header } from "../../../components/Header";
import { Playground } from "../../../components/Playground";
export default function SearchPage() { return <><Header /><main className="section-wrap page-shell"><p className="eyebrow">Playground / search</p><h1>Search a Khmer collection.</h1><p className="page-lede">Run normalized character retrieval against the 20-document local corpus.</p><Playground initialMode="search" /></main></>; }
