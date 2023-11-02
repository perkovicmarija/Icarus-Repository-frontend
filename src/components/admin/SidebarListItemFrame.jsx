import React from "react";

import SidebarListItemNested from './SidebarListItemNested';
import SidebarListItemNavLink from './SidebarListItemNavLink';
import * as Protected from '../../protectedAuth';

const SidebarListItemFrame = (props) => {

    return (
        <React.Fragment>
            {Protected.protectedAuth(props.route.permissions) &&
                (props.route.children ?
                    <SidebarListItemNested {...props} /> :
                    <SidebarListItemNavLink {...props} />
                )
            }
        </React.Fragment>
    )
}

export default SidebarListItemFrame;