export interface IsubCategory {
  id: string;
  indicator_id: number;
  composite_id: number;
  indicator_type: string;
  indicator_label: string;
  indictor_field_prefix: string;
  indicator_name_api: string;
  indicator_count_low: number;
  indicator_count_high: number;
  indicator_mean_average: number;
}

export interface ICategoryFooter {
  id: string;
  composite_id: number;
  indicator_type: string;
  indicator_label: string;
  indicator_count_low: number;
  indicator_count_high: number;
  indicator_mean_average: number;
  sub_indicators: IsubCategory[];
}
