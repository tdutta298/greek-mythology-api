import 'package:flutter/material.dart';

class GodDetailsPage extends StatelessWidget {
  final Map god;
  const GodDetailsPage({super.key, required this.god});

  Widget _buildDetail(String title, dynamic value) {
    if (value is List) value = value.join(', ');
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("$title: ", style: const TextStyle(fontWeight: FontWeight.bold)),
          Expanded(child: Text(value ?? "N/A")),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(god['name']), backgroundColor: Colors.blue),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDetail("Domain", god['domain']),
            _buildDetail("Symbols", god['symbols']),
            _buildDetail("Parents", god['parents']),
            _buildDetail("Roman Equivalent", god['romanEquivalent']),
            _buildDetail("Associated Myths", god['associatedMyths']),
          ],
        ),
      ),
    );
  }
}
