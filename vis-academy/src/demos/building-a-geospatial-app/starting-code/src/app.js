import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import taxiData from '../../../data/taxi';
import DeckGLOverlay from './deckgl-overlay';
import { LayerControls, HEXAGON_CONTROLS } from './layer-controls';
import { tooltipStyle } from './style';

const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v9';
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

if (!MAPBOX_TOKEN) {
  alert(
    'The mapbox token is not defined. Please export it in the terminal where you typed "npm start"'
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this._resize = this._resize.bind(this);

    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        longitude: -74,
        latitude: 40.7,
        zoom: 11,
        maxZoom: 16
      },
      settings: Object.keys(HEXAGON_CONTROLS).reduce(
        (accu, key) => ({
          ...accu,
          [key]: HEXAGON_CONTROLS[key].value
        }),
        {}
      )
    };
  }

  componentDidMount() {
    this._processData();
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _processData() {
    if (taxiData) {
      this.setState({ status: 'LOADED' });
      const points = taxiData.reduce((accu, curr) => {
        accu.push({
          position: [
            Number(curr.pickup_longitude),
            Number(curr.pickup_latitude)
          ],
          pickup: true
        });
        accu.push({
          position: [
            Number(curr.dropoff_longitude),
            Number(curr.dropoff_latitude)
          ],
          pickup: false
        });
        return accu;
      }, []);
      this.setState({
        points,
        status: 'READY'
      });
    }
  }

  _onHover({ x, y, object }) {
    this.setState({ x, y, hoveredObject: object });
  }

  _updateLayerSettings(settings) {
    this.setState({ settings });
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  render() {
    return (
      <div>
        <LayerControls
          settings={this.state.settings}
          propTypes={HEXAGON_CONTROLS}
          onChange={settings => this._updateLayerSettings(settings)}
        />
        <MapGL
          {...this.state.viewport}
          mapStyle={MAPBOX_STYLE}
          // This is needed to use mapbox styles
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={viewport => this._onViewportChange(viewport)}
        >
          {this.state.hoveredObject && (
            <div
              style={{
                ...tooltipStyle,
                transform: `translate(${this.state.x}px, ${this.state.y}px)`
              }}
            >
              <div>{JSON.stringify(this.state.hoveredObject)}</div>
            </div>
          )}
          <DeckGLOverlay
            viewport={this.state.viewport}
            data={this.state.points}
            onHover={hover => this._onHover(hover)}
            {...this.state.settings}
          />
        </MapGL>
      </div>
    );
  }
}