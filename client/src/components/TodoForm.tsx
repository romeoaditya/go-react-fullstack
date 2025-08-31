import {Button, Flex, Input, Spinner} from "@chakra-ui/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {IoMdAdd} from "react-icons/io";
import {BASE_URL} from "../App";
import {useColorModeValue} from "./ui/color-mode";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const inputBg = useColorModeValue("white", "gray.700");
  const borderCol = useColorModeValue("gray.300", "gray.600");

  const {mutate: createTodo, isPending: isCreating} = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await fetch(BASE_URL + `/todos`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({body: newTodo}),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setNewTodo("");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["todos"]});
    },
  });

  return (
    <form onSubmit={createTodo}>
      <Flex gap={2} my={4}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          bg={inputBg}
          border="1px"
          borderColor={borderCol}
          borderRadius="xl"
          shadow="sm"
        />
        <Button
          type="submit"
          colorScheme="blue"
          borderRadius="xl"
          px={4}
          _active={{transform: "scale(.97)"}}
        >
          {isCreating ? <Spinner size="xs" /> : <IoMdAdd size={22} />}
        </Button>
      </Flex>
    </form>
  );
};

export default TodoForm;
