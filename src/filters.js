import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { select, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { link } from '@wordpress/icons';

const { Fragment } = wp.element;

const withMenuPointToolbarButton = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {

		const { clientId } = props;

		const insertList = () => {
			const index = select('core/block-editor').getBlockIndex(clientId);

			if ( index < 0 ) {
				return;
			}

			const listBlock = createBlock('core/list', {
				values: "<li>Item 1</li><li>Item 2</li><li>Item 3</li>"
			});

			dispatch('core/block-editor').insertBlock(listBlock, index);

		}

        return (
            <Fragment>
				<BlockControls>
				<ToolbarButton
					icon={link}
					label={ __( 'Insert a List block' ) }
					onClick={ insertList }
				/>
				</BlockControls>
                <BlockEdit { ...props } />
            </Fragment>
        );
    };
}, 'withMenuPointToolbarButton' );

wp.hooks.addFilter(
    'editor.BlockEdit',
    'gb-paragraph-list/with-menu-point-toolbar-button',
    withMenuPointToolbarButton
);
