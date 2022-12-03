let file = "input"

module CharSet = Set.Make(Char)

let read_whole_file filename =
    let ch = open_in filename in
    let s = really_input_string ch (in_channel_length ch) in
    close_in ch;
    s

let create_set str =
  let set = CharSet.empty in
  CharSet.add_seq (String.to_seq str) set

let mapFn str =
  let length = String.length str in
  let firstHalf = String.sub str 0 (length / 2) in
  let secondHalf = String.sub str (length / 2) (length / 2) in
  let firstHalfSet = create_set firstHalf in
  let secondHalfSet = create_set secondHalf in
  CharSet.inter firstHalfSet secondHalfSet

let mapChar charcode =
  if charcode >= 97 && charcode <= 122 then (charcode - 97) + 1
  else (charcode - 65) + 27


let group_by_3 lst =
  let accum = ([], [], 0) in
  let f (all, current, size) x =
    if size = 3 then ((List.rev current) :: all, [x], 1)
    else (all, x::current, size + 1)
  in
  let (groups, last, _) = List.fold_left f accum lst in
  List.rev (List.rev last :: groups)

let part1 =
  let filecontents = read_whole_file file in
  let split = (String.split_on_char '\n' filecontents) in
  let intersections = List.map mapFn split in
  let priorities =
    List.map (fun charset -> CharSet.fold (fun char a -> (mapChar (Char.code char)) + a) charset 0
  ) intersections in
  List.fold_left (fun a b -> a + b) 0 priorities

let part2 =
  let filecontents = read_whole_file file in
  let split = (String.split_on_char '\n' filecontents) in
  let groups = group_by_3 split in
  let intersections = List.map (
    fun group ->
      List.fold_left (
        fun acc curr ->
          if (CharSet.cardinal acc) = 0 then create_set curr
          else CharSet.inter (create_set curr) acc
      ) CharSet.empty group
  ) groups in
  let priorities =
    List.map (fun charset -> CharSet.fold (fun char a -> (mapChar (Char.code char)) + a) charset 0
  ) intersections in
  List.fold_left (fun a b -> a + b) 0 priorities

let () = print_endline (string_of_int part2) 
