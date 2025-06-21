import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'myths_details.dart';

class MythsListPage extends StatefulWidget {
  const MythsListPage({super.key});

  @override
  State<MythsListPage> createState() => _MythsListPageState();
}

class _MythsListPageState extends State<MythsListPage> {
  List myths = [];

  @override
  void initState() {
    super.initState();
    fetchMyths();
  }

  Future<void> fetchMyths() async {
    final response = await http.get(Uri.parse('http://192.168.1.12:3000/api/myths'));
    if (response.statusCode == 200) {
      setState(() {
        myths = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load myths');
    }
  }

  Future<void> deleteMyth(String id) async {
    final response = await http.delete(Uri.parse('http://192.168.1.12:3000/api/myths/$id'));
    if (response.statusCode == 200) fetchMyths();
  }

  void showAddMythDialog() {
    final titleController = TextEditingController();
    final summaryController = TextEditingController();
    final charactersController = TextEditingController();
    final locationsController = TextEditingController();
    final moralController = TextEditingController();
    final sourceController = TextEditingController();

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Add a New Myth"),
        content: SingleChildScrollView(
          child: Column(
            children: [
              TextField(controller: titleController, decoration: const InputDecoration(labelText: "Title")),
              TextField(controller: summaryController, decoration: const InputDecoration(labelText: "Summary")),
              TextField(controller: charactersController, decoration: const InputDecoration(labelText: "Characters (comma-separated)")),
              TextField(controller: locationsController, decoration: const InputDecoration(labelText: "Locations (comma-separated)")),
              TextField(controller: moralController, decoration: const InputDecoration(labelText: "Moral")),
              TextField(controller: sourceController, decoration: const InputDecoration(labelText: "Source")),
            ],
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
          ElevatedButton(
            onPressed: () async {
              final newMyth = {
                "title": titleController.text,
                "summary": summaryController.text,
                "characters": charactersController.text.split(',').map((e) => e.trim()).toList(),
                "locations": locationsController.text.split(',').map((e) => e.trim()).toList(),
                "moral": moralController.text,
                "source": sourceController.text,
              };
              final response = await http.post(
                Uri.parse('http://192.168.1.12:3000/api/myths'),
                headers: {"Content-Type": "application/json"},
                body: json.encode(newMyth),
              );
              if (response.statusCode == 201) {
                fetchMyths();
                Navigator.pop(context);
              }
            },
            child: const Text("Add"),
          )
        ],
      ),
    );
  }

  void showDeleteDialog(Map myth) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text("Delete '${myth['title']}'?"),
        content: const Text("Are you sure you want to delete this myth?"),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () {
              Navigator.pop(context);
              deleteMyth(myth['_id']);
            },
            child: const Text("Delete"),
          ),
        ],
      ),
    );
  }

  void showDetailsPage(Map myth) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => MythDetailsPage(myth: myth)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.purple.shade900.withOpacity(0.1),
      appBar: AppBar(title: const Text('Greek Myths'), backgroundColor: Colors.purple),
      body: ListView.builder(
        padding: const EdgeInsets.only(top: 20),
        itemCount: myths.length,
        itemBuilder: (context, index) {
          final myth = myths[index];
          return Card(
            color: Colors.purple.shade100.withOpacity(0.3),
            margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
            child: ListTile(
              title: Text(myth['title'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
              onTap: () => showDetailsPage(myth),
              onLongPress: () => showDeleteDialog(myth),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.purple,
        onPressed: showAddMythDialog,
        child: const Icon(Icons.add),
      ),
    );
  }
}
