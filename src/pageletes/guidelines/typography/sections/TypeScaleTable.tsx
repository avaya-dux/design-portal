import { Form, Select, SelectOption, Table } from "@avaya/neo-react";
import { useEffect, useState } from "react";

import type { LanguageOptions } from "./type-scale-translations";
import { TypeScaleTranslations } from "./type-scale-translations";

import "./TypeScaleTable.css";

const columns = [
	{
		Header: "Type",
		accessor: "type",
		disableFilters: true,
		disableSortBy: true,
	},
	{
		Header: "Example",
		accessor: "example",
		disableFilters: true,
		disableSortBy: true,
	},
];

export const TypeScaleTable = () => {
	const [language, setLanguage] = useState<LanguageOptions>("english");
	const [data, setData] = useState([
		{
			id: "1",
			type: "H1 - Noto Sans Jumbo, 80px (Regular)",
			example: <h1>{TypeScaleTranslations[language]}</h1>,
		},
	]);
	useEffect(() => {
		setData([
			{
				id: "1",
				type: "H1 - Noto Sans Jumbo, 80px (Regular)",
				example: <h1>{TypeScaleTranslations[language]}</h1>,
			},
			{
				id: "2",
				type: "H2 - Noto Sans, 32px (Regular, Bold and Underline)",
				example: <h2>{TypeScaleTranslations[language]}</h2>,
			},
			{
				id: "3",
				type: "H3 - Noto Sans, 26px (Regular)",
				example: <h3>{TypeScaleTranslations[language]}</h3>,
			},
			{
				id: "4",
				type: "H4 - Noto Sans, 19px (Regular)",
				example: <h4>{TypeScaleTranslations[language]}</h4>,
			},
			{
				id: "5",
				type: "Large Body - Noto Sans, 16px (Regular)",
				example: (
					<p className="neo-body-large">{TypeScaleTranslations[language]}</p>
				),
			},
			{
				id: "6",
				type: "Body - Noto Sans, 14px (Regular, Italic, Underline, Semibold and Uppercase)",
				example: <p>{TypeScaleTranslations[language]}</p>,
			},
			{
				id: "7",
				type: "Body Code - Roboto Mono, 14px (Regular)",
				example: (
					<p style={{ fontFamily: "Roboto Mono" }}>
						{TypeScaleTranslations[language]}
					</p>
				),
			},
			{
				id: "8",
				type: "Small Body - Noto Sans, 12px (Regular and Light)",
				example: (
					<p className="neo-body-small">{TypeScaleTranslations[language]}</p>
				),
			},
			{
				id: "9",
				type: "Tiny Body - Noto Sans, 10px (Regular and Light)",
				example: (
					<p className="neo-body-tiny">{TypeScaleTranslations[language]}</p>
				),
			},
		]);
	}, [language]);

	return (
		<div id="guidelines-typography-typescaletable">
			<Form inline>
				<Select
					label="Language"
					value={language}
					onChange={(value) => setLanguage(value as LanguageOptions)}
					style={{ width: 200 }}
				>
					<SelectOption value="english">English</SelectOption>
					<SelectOption value="arabic">Arabic</SelectOption>
					<SelectOption value="hebrew">Hebrew</SelectOption>
					<SelectOption value="korean">Korean</SelectOption>
					<SelectOption value="japanese">Japanese</SelectOption>
					<SelectOption value="chinese">Chinese</SelectOption>
					<SelectOption value="cyrillic">Cyrillic</SelectOption>
					<SelectOption value="greek">Greek</SelectOption>
				</Select>
			</Form>

			<Table columns={columns} data={data} showPagination={false} readonly />
		</div>
	);
};
