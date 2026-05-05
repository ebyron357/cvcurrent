import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Services from "@/pages/services";
import About from "@/pages/about";
import Features from "@/pages/features";
import Pricing from "@/pages/pricing";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Disclaimer from "@/pages/disclaimer";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Insights from "@/pages/insights";
import Resources from "@/pages/resources";
import CaseStudies from "@/pages/case-studies";
import Podcasts from "@/pages/podcasts";
import Videos from "@/pages/videos";
import RevenueCalculator from "@/pages/revenue-calculator";
import RoiCalculator from "@/pages/roi-calculator";
import AiReadiness from "@/pages/ai-readiness";
import Clarity from "@/pages/clarity";
import SaigOs from "@/pages/saig-os";
import NotFound from "@/pages/not-found";
import MrClientVerse from "@/components/mr-clientverse";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/features" component={Features} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/insights" component={Insights} />
      <Route path="/resources" component={Resources} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/podcasts" component={Podcasts} />
      <Route path="/videos" component={Videos} />
      <Route path="/revenue-calculator" component={RevenueCalculator} />
      <Route path="/roi-calculator" component={RoiCalculator} />
      <Route path="/ai-readiness" component={AiReadiness} />
      <Route path="/clarity" component={Clarity} />
      <Route path="/saig-os" component={SaigOs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <MrClientVerse />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
