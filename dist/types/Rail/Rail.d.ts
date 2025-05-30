import React, { Component } from 'react';
import { OtherProps } from '../types';
import { RailProps } from './types';
export declare class Rail extends Component<RailProps> {
    getRailProps: (props?: OtherProps) => {
        onMouseDown: (e: React.MouseEvent<Element, MouseEvent>) => void;
        onTouchStart: (e: React.TouchEvent<Element>) => void;
    };
    render(): string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ReactPortal | null | undefined;
}
