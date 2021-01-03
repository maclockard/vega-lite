import {SelectionParameter} from '../selection';
import {NormalizedUnitSpec} from '../spec';
import {SpecMapper} from '../spec/map';
import {NormalizerParams} from './base';

export class SelectionCompatibilityNormalizer extends SpecMapper<NormalizerParams, NormalizedUnitSpec> {
  public mapUnit(spec: NormalizedUnitSpec) {
    const selections = (spec as any).selection;
    const params: SelectionParameter[] = [];

    if (!selections) return spec;

    for (const [name, selDef] of Object.entries(selections)) {
      const {init, bind, ...select} = selDef as any;
      if (select.type === 'single') {
        select.type = 'point';
        select.toggle = false;
      } else if (select.type === 'multi') {
        select.type = 'point';
      }

      params.push({
        name,
        value: init,
        select,
        bind
      });
    }

    if (params.length) {
      spec.params = params;
    }
    return spec;
  }
}