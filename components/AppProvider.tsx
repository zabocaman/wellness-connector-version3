"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSupabaseClient } from "@/lib/supabase";
import type {
  ArchetypeId,
  PostedEvent,
  UserProfile,
} from "@/lib/types";

type Provider = "google" | "facebook";

type AppContextValue = {
  ready: boolean;
  user: UserProfile | null;
  savedEvents: string[];
  subscribedEvents: string[];
  quizResult: ArchetypeId | null;
  postedEvents: PostedEvent[];
  signIn: (provider: Provider) => Promise<"oauth" | "demo">;
  signOut: () => Promise<void>;
  toggleSaved: (id: string) => void;
  toggleSubscribed: (id: string) => void;
  setQuizResult: (result: ArchetypeId) => void;
  addPostedEvent: (event: PostedEvent) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const storageKeys = {
  user: "wc_user",
  saved: "wc_saved",
  subscribed: "wc_subscribed",
  quiz: "wc_quiz_result",
  posted: "wc_posted_events",
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [subscribedEvents, setSubscribedEvents] = useState<string[]>([]);
  const [quizResultState, setQuizResultState] = useState<ArchetypeId | null>(null);
  const [postedEvents, setPostedEvents] = useState<PostedEvent[]>([]);

  useEffect(() => {
    const supabase = getSupabaseClient();
    setUser(readJson<UserProfile | null>(storageKeys.user, null));
    setSavedEvents(readJson<string[]>(storageKeys.saved, []));
    setSubscribedEvents(readJson<string[]>(storageKeys.subscribed, []));
    setQuizResultState(
      readJson<ArchetypeId | null>(storageKeys.quiz, null),
    );
    setPostedEvents(readJson<PostedEvent[]>(storageKeys.posted, []));

    if (supabase) {
      void supabase.auth.getSession().then(({ data }) => {
        const sessionUser = data.session?.user;
        if (sessionUser) {
          setUser({
            id: sessionUser.id,
            name:
              sessionUser.user_metadata.full_name ??
              sessionUser.user_metadata.name ??
              "Wellness member",
            email: sessionUser.email ?? "",
            provider:
              sessionUser.app_metadata.provider === "facebook"
                ? "facebook"
                : "google",
            avatar: sessionUser.user_metadata.avatar_url,
          });
        } else {
          setUser(null);
        }
        setReady(true);
      });
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          setUser(null);
          return;
        }
        setUser({
          id: session.user.id,
          name:
            session.user.user_metadata.full_name ??
            session.user.user_metadata.name ??
            "Wellness member",
          email: session.user.email ?? "",
          provider:
            session.user.app_metadata.provider === "facebook"
              ? "facebook"
              : "google",
          avatar: session.user.user_metadata.avatar_url,
        });
      });
      return () => data.subscription.unsubscribe();
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(storageKeys.user, JSON.stringify(user));
  }, [ready, user]);

  const signIn = useCallback(async (provider: Provider) => {
    const supabase = getSupabaseClient();
    if (supabase) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}${basePath}/profile/`,
        },
      });
      return "oauth";
    }

    const demoUser: UserProfile = {
      id: `demo-${provider}`,
      name: "Alex Morgan",
      email: `alex@${provider}.demo`,
      provider,
    };
    setUser(demoUser);
    return "demo";
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  }, []);

  const updateList = useCallback(
    (
      id: string,
      key: string,
      setter: React.Dispatch<React.SetStateAction<string[]>>,
    ) => {
      setter((current) => {
        const next = current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id];
        window.localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const toggleSaved = useCallback(
    (id: string) => updateList(id, storageKeys.saved, setSavedEvents),
    [updateList],
  );
  const toggleSubscribed = useCallback(
    (id: string) =>
      updateList(id, storageKeys.subscribed, setSubscribedEvents),
    [updateList],
  );
  const setQuizResult = useCallback((result: ArchetypeId) => {
    setQuizResultState(result);
    window.localStorage.setItem(storageKeys.quiz, JSON.stringify(result));
  }, []);
  const addPostedEvent = useCallback((event: PostedEvent) => {
    setPostedEvents((current) => {
      const next = [event, ...current];
      window.localStorage.setItem(storageKeys.posted, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      ready,
      user,
      savedEvents,
      subscribedEvents,
      quizResult: quizResultState,
      postedEvents,
      signIn,
      signOut,
      toggleSaved,
      toggleSubscribed,
      setQuizResult,
      addPostedEvent,
    }),
    [
      ready,
      user,
      savedEvents,
      subscribedEvents,
      quizResultState,
      postedEvents,
      signIn,
      signOut,
      toggleSaved,
      toggleSubscribed,
      setQuizResult,
      addPostedEvent,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
