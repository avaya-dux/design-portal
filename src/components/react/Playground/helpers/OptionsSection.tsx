import clsx from "clsx";

/**
 * The OptionsSection component is meant to be used in association with the Playground component
 * and the OptionsContainer component. It is used to wrap a grouping of options in order to provide
 * a consistent styling and layout.
 *
 * An `OptionsSection` can contain multiple options, such as a `RadioGroup` and a `CheckboxGroup`.
 *
 * @example
  <Playground
    // ...
    options={
      <Playground.OptionsContainer onReset={resetExample}>
        <Playground.OptionsSection title="Variant">
          <RadioGroup
            name="variant"
            value={variant}
            onChange={setVariant}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
            ]}
          />
        </Playground.OptionsSection>

        <Playground.OptionsSection title="Variables" id="variables">
            <CheckboxGroup
              groupName="Variables"
              aria-labelledby="variables"
            >
              <Checkbox value="dir" checked={dir === "rtl"}>
                RTL
              </Checkbox>
              <Checkbox value="disabled" checked={disabled}>
                Disabled
              </Checkbox>
            </CheckboxGroup>
          </Playground.OptionsSection>
      </Playground.OptionsContainer>
    }
  >
    <Button>example</Button>
  </Playground>
 */
export const OptionsSection = ({
  title,
  children,
  className,
  id,
  style,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) => (
  <section
    className={clsx("playground-options-section", className)}
    style={style}
  >
    <label className="playground-options-section-label" id={id}>
      {title}
    </label>

    {children}
  </section>
);
