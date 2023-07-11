import { Accordion, AccordionItem } from "@/shared/UIKit";
import { Meta, StoryObj } from "@storybook/react";
import { GiPlasticDuck } from "react-icons/gi";

const meta: Meta<typeof Accordion> = {
    title: "Accordion",
    component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const defaultItems = [
    {
        value: "1",
        title: "title of 1",
        children: "some content of 1",
    },
    {
        value: "2",
        title: "title of 2",
        children: "some content of 2",
    },
    {
        value: "3",
        title: "title of 3",
        children: "some content of 3",
    },
];

export const Default: Story = {
    render: (props) => {
        return (
            <>
                <Accordion {...props}>
                    {defaultItems.map((item) => {
                        return (
                            <AccordionItem theme={"default"} key={item.value} title={item.title} value={item.value}>
                                {item.children}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </>
        );
    },
};

export const Flush: Story = {
    render: (props) => {
        return (
            <>
                <Accordion {...props}>
                    {defaultItems.map((item) => {
                        return (
                            <AccordionItem theme={"flush"} key={item.value} title={item.title} value={item.value}>
                                {item.children}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </>
        );
    },
};

export const Single: Story = {
    render: (props) => {
        return (
            <>
                <Accordion {...props}>
                    {defaultItems.map((item) => {
                        return (
                            <AccordionItem key={item.value} title={item.title} value={item.value}>
                                {item.children}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </>
        );
    },
    args: {
        type: "single",
    },
};

export const Multiple: Story = {
    render: (props) => {
        return (
            <>
                <Accordion {...props}>
                    {defaultItems.map((item) => {
                        return (
                            <AccordionItem key={item.value} title={item.title} value={item.value}>
                                {item.children}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </>
        );
    },
    args: {
        type: "multiple",
    },
};

export const WithLeftContent: Story = {
    render: (props) => {
        return (
            <>
                <Accordion {...props}>
                    {defaultItems.map((item) => {
                        return (
                            <AccordionItem
                                left={<GiPlasticDuck className={"mr-2 h-4 w-4"} />}
                                key={item.value}
                                title={item.title}
                                value={item.value}
                            >
                                {item.children}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </>
        );
    },
    args: {
        type: "multiple",
    },
};
