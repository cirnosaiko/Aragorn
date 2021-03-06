import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { routes } from './routes';
import { SideBar } from '@renderer/components/SideBar';
import { WindowButton } from '@renderer/components/WindowButton';
import {
  useAppStateHandle,
  useAppUpdateHandle,
  useFileDownloadHandle,
  useWebServerHandle
} from '@renderer/hook/useIpcRendererHandle';
import { usePlatform } from '@renderer/hook/usePlatform';
import './app.less';

const App = () => {
  useAppStateHandle();
  useAppUpdateHandle();
  useFileDownloadHandle();
  useWebServerHandle();
  const platform = usePlatform();

  return (
    <HashRouter>
      {platform === 'win32' && <WindowButton />}
      <SideBar className={platform === 'win32' ? 'app-win32-wrapper' : ''} routes={routes} />
      <div className="page-container">
        {routes.map(
          route =>
            route.path && (
              <Route key={route.path} path={route.path} exact>
                {({ match }) => (
                  <CSSTransition in={match !== null} timeout={300} classNames="page" unmountOnExit>
                    <div className="page">
                      <div
                        className={
                          platform === 'win32'
                            ? 'app-main-content-wrapper app-win32-wrapper'
                            : 'app-main-content-wrapper'
                        }
                      >
                        {route.component && <route.component />}{' '}
                      </div>
                    </div>
                  </CSSTransition>
                )}
              </Route>
            )
        )}
      </div>
    </HashRouter>
  );
};

export default App;
