let file = "input"

module IntSet = Set.Make(Int)

let read_whole_file filename =
  let ch = open_in filename in
  let s = really_input_string ch (in_channel_length ch) in
  close_in ch;
  s


let create_set range =
  let set = IntSet.empty in
  IntSet.add_seq (List.to_seq range) set

let range lower upper =
  let rec range_iter lower upper accum =
    if lower > upper then accum
    else range_iter (lower + 1) upper (lower :: accum)
  in
  range_iter lower upper []
  
let parse_exp exp =
  let separator_index = String.index exp '-' in
  let lower = int_of_string (String.sub exp 0 separator_index) in
  let upper = int_of_string (Str.string_after exp (separator_index + 1)) in
  (lower, upper)

let range_to_arr range_str =
  let (lower,upper) = parse_exp range_str in
  range lower upper

let compute_intersect range =
  let comma_index = String.index range ',' in
  let first_exp = (String.sub range 0 comma_index) in
  let second_exp = Str.string_after range (comma_index + 1) in
  let first_range = range_to_arr first_exp in
  let second_range = range_to_arr second_exp in
  let set1 = create_set first_range in
  let set2 = create_set second_range in
  let set1_card = IntSet.cardinal set1 in
  let set2_card = IntSet.cardinal set2 in
  let intersects =
    if set1_card > set2_card then IntSet.cardinal (IntSet.inter set2 set1) = set2_card
    else IntSet.cardinal (IntSet.inter set1 set2) = set1_card
  in
  intersects

let compute_intersect2 range =
  let comma_index = String.index range ',' in
  let first_exp = (String.sub range 0 comma_index) in
  let second_exp = Str.string_after range (comma_index + 1) in
  let first_range = range_to_arr first_exp in
  let second_range = range_to_arr second_exp in
  let set1 = create_set first_range in
  let set2 = create_set second_range in
  let set1_card = IntSet.cardinal set1 in
  let set2_card = IntSet.cardinal set2 in
  let intersects =
    if set1_card > set2_card then IntSet.cardinal (IntSet.inter set2 set1) > 0
    else IntSet.cardinal (IntSet.inter set1 set2) > 0
  in
  intersects

let part1 =
  let filecontents = read_whole_file file in
  let contents_list = String.split_on_char '\n' filecontents in
  let intersections = List.map compute_intersect contents_list in
  let integers = List.map (fun intersects -> if intersects then 1 else 0) intersections in
  integers

let part2 =
  let filecontents = read_whole_file file in
  let contents_list = String.split_on_char '\n' filecontents in
  let intersections = List.map compute_intersect2 contents_list in
  let integers = List.map (fun intersects -> if intersects then 1 else 0) intersections in
  integers

let () =
  let sum = List.fold_left (fun a b -> a + b) 0 part2 in
  print_endline (string_of_int sum)
