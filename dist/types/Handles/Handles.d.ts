import React, { Component } from 'react';
import { OtherProps } from '../types';
import { HandlesProps } from './types';
export declare class Handles extends Component<HandlesProps> {
    autofocus: (e: React.MouseEvent<Element>) => void;
    getHandleProps: (id: string, props?: OtherProps) => {
        onKeyDown: (e: React.KeyboardEvent<Element>) => void;
        onMouseDown: (e: React.MouseEvent<Element, MouseEvent>) => void;
        onTouchStart: (e: React.TouchEvent<Element>) => void;
    };
    render(): string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ReactPortal | null | undefined;
}
