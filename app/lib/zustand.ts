import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CryptoData = {
  id: string;
  sourceurl: string;
  heading: string;
  name: string;
  symbol: string;
  about: string;
  synopsis: string;
  position: "long" | "short" | "unclear";
  buy: string;
  buyprice: number;
  takeprofit: number;
  stoploss: number;
  sell: string;
  sellprice: number;
  shortcoverprofit: number;
  shortcoverloss: number;
  waitout: string;
  monitor: string;
  tag: string;
  status: string;
  priceAtCreation: string;
  triggeredposition: string;
  scrappedat: string;
  createdat: number;
  triggeredat: number;
  closureat: number;
};

type UserType = {
  eamil: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
};

type TickerTapeDisplayType = {
  displayTickerTape: boolean;
  setDisplay: (show: boolean) => void;
};

type CryptoDashboardType = {
  currentCryptoId: string;
  cryptoData: CryptoData | undefined;
  setCurrCryptoId: (id: string) => void;
  setCryptoData: (about: string, data: CryptoData) => void;
};

type PositionDisplay = {
  positionDisplayed: "long" | "short";
  togglePosition: (position: "long" | "short") => void;
};

type ShowModal = {
  showModal: boolean;
  toggleShowModal: (show: boolean) => void;
};

type CurrUser = {
  isSignedIn: boolean;
  currUser: UserType | null;
  setUser: (isSignedIn: boolean, user: UserType | null) => void;
};

type LogoutModal = {
  showLogoutModal: boolean;
  toggleLogoutModal: (show: boolean) => void;
};

type AllCryprtos = {
  allCryptos: CryptoData[];
  setAllCryptos: (data: CryptoData[]) => void;
};
type AllTrades = {
  allTrades: CryptoData[];
  setAllTrades: (data: CryptoData[]) => void;
};

type Paginate = {
  HasPrevPage: boolean;
  HasNextPage: boolean;
  LastSeenId: string;
  LastSeenTimeStamp: number;
  FirstSeenId: string;
  FirstSeenTimeStamp: number;
  Offset: number;
  Limit: number;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  setCursor: (
    HasPrevPage: boolean,
    HasNextPage: boolean,
    LastSeenId: string,
    LastSeenTimeStamp: number,
    FirstSeenId: string,
    FirstSeenTimeStamp: number
  ) => void;
};

type TVCandleModal = {
  showCandleModal: boolean;
  toggleCandleShowModal: (show: boolean) => void;
};
type TVAreaModal = {
  showAreaModal: boolean;
  toggleAreaShowModal: (show: boolean) => void;
};

type CHART = "area" | "candle";

type SwitchChart = {
  currChart: CHART;
  toggleCurrChart: (curr: CHART) => void;
};

const useTickerTapeDisplay = create<TickerTapeDisplayType>(set => ({
  displayTickerTape: false,
  setDisplay: show => set({ displayTickerTape: show }),
}));

const useCurrentCryptoId = create<CryptoDashboardType>()(
  persist(
    set => ({
      currentCryptoId: "",
      cryptoData: undefined,
      setCurrCryptoId: id => set(() => ({ currentCryptoId: id })),
      setCryptoData: (about, data) =>
        set(() => ({
          cryptoData: {
            ...data,
            about: about,
          },
        })),
    }),
    {
      name: "crypto-store", // key used in localStorage
      // optional: limit which state to persist
      // partialize: (state) => ({ currentCryptoId: state.currentCryptoId, cryptoData: state.cryptoData }),
      // optional: choose storage (defaults to localStorage)
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

const useTogglePosition = create<PositionDisplay>(set => ({
  positionDisplayed: "long",
  togglePosition: position => set({ positionDisplayed: position }),
}));

const useShowSigninModal = create<ShowModal>(set => ({
  showModal: false,
  toggleShowModal: show => set(() => ({ showModal: show })),
}));

const useUser = create<CurrUser>()(
  persist(
    set => ({
      isSignedIn: false,
      currUser: null,
      setUser: (isSignedIn, data) =>
        set(() => ({
          isSignedIn: isSignedIn,
          currUser: data,
        })),
    }),
    { name: "user-store" }
  )
);

const useLogoutModal = create<LogoutModal>(set => ({
  showLogoutModal: false,
  toggleLogoutModal: show => set({ showLogoutModal: show }),
}));

const useAllCryptos = create<AllCryprtos>(set => ({
  allCryptos: [],
  setAllCryptos: data => set({ allCryptos: data }),
}));

const useAllTrades = create<AllTrades>(set => ({
  allTrades: [],
  setAllTrades: data => set({ allTrades: data }),
}));

const usePaginate = create<Paginate>(set => ({
  HasPrevPage: false,
  HasNextPage: false,
  LastSeenId: "",
  LastSeenTimeStamp: 0,
  FirstSeenId: "",
  FirstSeenTimeStamp: 0,
  Offset: 0,
  Limit: 9,
  setOffset: offset => set({ Offset: offset }),
  setLimit: limit => set({ Limit: limit }),
  setCursor: (
    HasPrevPage: boolean,
    HasNextPage: boolean,
    LastSeenId: string,
    LastSeenTimeStamp: number,
    FirstSeenId: string,
    FirstSeenTimeStamp: number
  ) =>
    set({
      HasPrevPage,
      HasNextPage,
      LastSeenId,
      LastSeenTimeStamp,
      FirstSeenId,
      FirstSeenTimeStamp,
    }),
}));

const useTradePaginate = create<Paginate>(set => ({
  HasPrevPage: false,
  HasNextPage: false,
  LastSeenId: "",
  LastSeenTimeStamp: 0,
  FirstSeenId: "",
  FirstSeenTimeStamp: 0,
  Offset: 0,
  Limit: 14,
  setOffset: offset => set({ Offset: offset }),
  setLimit: limit => set({ Limit: limit }),
  setCursor: (
    HasPrevPage: boolean,
    HasNextPage: boolean,
    LastSeenId: string,
    LastSeenTimeStamp: number,
    FirstSeenId: string,
    FirstSeenTimeStamp: number
  ) =>
    set({
      HasPrevPage,
      HasNextPage,
      LastSeenId,
      LastSeenTimeStamp,
      FirstSeenId,
      FirstSeenTimeStamp,
    }),
}));

const useTVCandleModal = create<TVCandleModal>(set => ({
  showCandleModal: false,
  toggleCandleShowModal: show => set({ showCandleModal: show }),
}));
const useTVAreaModal = create<TVAreaModal>(set => ({
  showAreaModal: false,
  toggleAreaShowModal: show => set({ showAreaModal: show }),
}));
const useChart = create<SwitchChart>((set, get) => ({
  currChart: "area",
  toggleCurrChart: () =>
    set({
      currChart: get().currChart === "area" ? "candle" : "area",
    }),
}));

type WindowWidth = {
  windowWidth: number;
  setWindowWidth: (width: number) => void;
};
const useWindowWidth = create<WindowWidth>(set => ({
  windowWidth: 0,
  setWindowWidth: (width: number) => set({ windowWidth: width }),
}));

type DashNav = {
  currTab: number;
  setCurrTab: (tab: number) => void;
};

const useDashNav = create<DashNav>(set => ({
  currTab: 0,
  setCurrTab: (tab: number) => set({ currTab: tab }),
}));

type ShowSidebar = {
  showSidebar: boolean;
  toggleShow: (show: boolean) => void;
};

const useToggleSidebar = create<ShowSidebar>(set => ({
  showSidebar: false,
  toggleShow: show => set({ showSidebar: show }),
}));

type UserModal = {
  showUserModal: boolean;
  setShowUserModal: (show: boolean) => void;
};

const useUserModal = create<UserModal>(set => ({
  showUserModal: false,
  setShowUserModal: (show: boolean) => set({ showUserModal: show }),
}));
export {
  useTickerTapeDisplay,
  useCurrentCryptoId,
  useTogglePosition,
  useShowSigninModal,
  useUser,
  useLogoutModal,
  useAllCryptos,
  usePaginate,
  useTVCandleModal,
  useTVAreaModal,
  useChart,
  useWindowWidth,
  useDashNav,
  useToggleSidebar,
  useUserModal,
  useAllTrades,
  useTradePaginate,
};
