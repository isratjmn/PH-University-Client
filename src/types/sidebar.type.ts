import { ReactNode } from "react";

export type TRoute = {
	path: string;
	element: ReactNode;
};

export type TSideBarItems =
	| {
			key: string;
			label: ReactNode;
			children?: TSideBarItems[];
	}
	| undefined;

export type TUserPath = {
	name?: string;
	path?: string;
	element?: ReactNode;
	children?: TUserPath[];
};
