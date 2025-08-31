import {Badge, Box, Flex, Spinner, Text} from "@chakra-ui/react";
import {FaCheckCircle} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {Todo} from "./TodoList";
import {BASE_URL} from "../App";
import {useColorModeValue} from "./ui/color-mode";

const TodoItem = ({todo}: {todo: Todo}) => {
  const queryClient = useQueryClient();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderCol = useColorModeValue("gray.200", "gray.700");
  const textCol = useColorModeValue("gray.800", "gray.100");

  const {mutate: updateTodo, isPending: isUpdating} = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return;
      const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["todos"]});
    },
  });

  const {mutate: deleteTodo, isPending: isDeleting} = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["todos"]});
    },
  });

  return (
    <Flex
      gap={3}
      alignItems="center"
      bg={cardBg}
      border="1px"
      borderColor={borderCol}
      p={3}
      borderRadius="xl"
      shadow="md"
      transition="all 0.2s"
      _hover={{shadow: "lg", transform: "translateY(-2px)"}}
    >
      <Flex flex={1} alignItems="center" justifyContent="space-between">
        <Text
          color={todo.completed ? "green.400" : textCol}
          textDecoration={todo.completed ? "line-through" : "none"}
          fontWeight="medium"
        >
          {todo.body}
        </Text>
        <Badge
          ml="2"
          colorScheme={todo.completed ? "green" : "blue"}
          borderRadius="md"
          px={2}
          py={1}
        >
          {todo.completed ? "Done" : "In Progress"}
        </Badge>
      </Flex>
      <Flex gap={2}>
        <Box
          color="green.400"
          cursor="pointer"
          _hover={{color: "green.500", transform: "scale(1.15)"}}
          transition="all 0.2s"
          onClick={() => updateTodo()}
        >
          {isUpdating ? <Spinner size="sm" /> : <FaCheckCircle size={22} />}
        </Box>
        <Box
          color="red.400"
          cursor="pointer"
          _hover={{color: "red.500", transform: "scale(1.15)"}}
          transition="all 0.2s"
          onClick={() => deleteTodo()}
        >
          {isDeleting ? <Spinner size="sm" /> : <MdDelete size={24} />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
