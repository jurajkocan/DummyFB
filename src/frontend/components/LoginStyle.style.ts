import { style } from 'typestyle';

export namespace LoginStyle {
    export const Card = style(
        {
            margin: 'auto',
            width: 300,
        }
    );

    export const LoginWrapper = style({
        height: '100%',
        width: '100%',
        position: 'fixed',
        display: 'flex',
        textAlign: 'center',
    });

    export const SpaceWrapper = style({
        marginBottom: 10,
    });

    export const AlertMessage = (show: boolean) => style({
        display: show ? 'block' : 'none',
    });
}
